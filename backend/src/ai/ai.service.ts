import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { DetectAnomaliesDto } from './dto/detect-anomalies.dto';
import { AlertsService } from '../module/alerts/alerts.service';
import { RecommendationsService } from '../module/recommendations/recommendations.service';
import { CreateAlertDto } from '../module/alerts/dto/create-alert.dto';
import { CreateRecommendationDto } from '../module/recommendations/dto/create-recommendation.dto';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly alertsService: AlertsService,
    private readonly recommendationsService: RecommendationsService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY not found in environment variables');
    }
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  /**
   * Utilidad simple para comparar el valor actual con el promedio del histórico.
   * Devuelve true si la variación es menor al umbral relativo.
   */
  private isNearHistoricalAverage(
    current: number,
    history: number[],
    relativeThreshold = 0.05,
  ): boolean {
    if (!history.length) return false;
    const avg =
      history.reduce((acc, value) => acc + value, 0) / history.length || 0;
    if (avg === 0) return false;
    const diff = Math.abs(current - avg) / avg;
    return diff <= relativeThreshold;
  }

  private async callOpenAI(prompt: string) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }
    return JSON.parse(content);
  }

  async detectAnomalies(data: DetectAnomaliesDto) {
    const lastValues = data.lastValues ?? [];

    const humSueloHistory = lastValues.map((v) => v.hum_suelo ?? 0);
    const tempAmbHistory = lastValues.map((v) => v.temp_ambiente ?? 0);

    const humedadSueloCercaPromedio = this.isNearHistoricalAverage(
      data.hum_suelo,
      humSueloHistory,
    );
    const tempAmbienteCercaPromedio = this.isNearHistoricalAverage(
      data.temp_ambiente,
      tempAmbHistory,
    );

    const basePrompt = `
Eres un motor experto en salud de plantas.
Recibes métricas ambientales y debes:
1. Detectar anomalías
2. Explicar su causa probable
3. Generar recomendaciones
4. Calificar severidad (1–5)

Datos sensores actuales:
- Temperatura ambiente: ${data.temp_ambiente} °C
- Humedad ambiente: ${data.hum_ambiente} %
- Humedad suelo: ${data.hum_suelo} %
- Temperatura suelo: ${data.temp_suelo} °C
- Timestamp: ${data.timestamp}

Histórico (JSON): ${JSON.stringify(lastValues)}
Rangos ideales (texto libre o JSON): ${data.idealRanges ?? 'no especificado'}

Responde en JSON válido:
{
  "anomalia": true/false,
  "tipo": "string",
  "descripcion": "string",
  "accion": "string",
  "severidad": 1-5
}
`;

    try {
      // Primer análisis
      const primeraRespuesta = await this.callOpenAI(basePrompt);

      let resultadoFinal = {
        ...primeraRespuesta,
        reanalizado: false,
        falsoPositivo: false,
      };

      // Heurística simple para detectar posibles falsos positivos
      const posibleFalsoPositivo =
        primeraRespuesta?.anomalia === true &&
        humedadSueloCercaPromedio &&
        tempAmbienteCercaPromedio;

      if (posibleFalsoPositivo) {
        const reanalisisPrompt = `
En un primer análisis marcaste una anomalía con estos datos:
${JSON.stringify(primeraRespuesta)}

Sin embargo, los valores actuales están muy cerca del promedio histórico
de humedad del suelo y temperatura ambiente (variación menor al 5%).

Reconsidera tu decisión. Indica si sigue siendo una anomalía o si podría
haber sido un falso positivo.

Responde SOLO en JSON válido:
{
  "anomalia": true/false,
  "motivo": "string"
}
`;

        const reanalisis = await this.callOpenAI(reanalisisPrompt);

        resultadoFinal = {
          ...resultadoFinal,
          anomalia: reanalisis.anomalia,
          motivoReanalisis: reanalisis.motivo,
          reanalizado: true,
          falsoPositivo: reanalisis.anomalia === false,
        };
      }

      // Registrar anomalía como alerta si aplica
      if (resultadoFinal.anomalia && data.plantId) {
        const alertDto: CreateAlertDto = {
          plantId: data.plantId,
          sensorId: data.sensorId,
          type: primeraRespuesta.tipo ?? 'anomalía_sensor',
          severity: primeraRespuesta.severidad ?? 1,
          message: primeraRespuesta.descripcion ?? 'Anomalía detectada por IA',
        };

        await this.alertsService.create(alertDto);
      }

      return resultadoFinal;
    } catch (error) {
      this.logger.error('Error calling OpenAI API for anomaly detection', error);
      throw error;
    }
  }

  /**
   * Motor de reglas estático sencillo para recomendaciones inmediatas.
   */
  private ruleBasedRecommendations(data: DetectAnomaliesDto) {
    const recs: {
      mensaje: string;
      prioridad: number;
      tipo: string;
    }[] = [];

    if (data.hum_suelo < 20) {
      recs.push({
        mensaje:
          'La humedad del suelo es muy baja, considera iniciar riego por goteo.',
        prioridad: 5,
        tipo: 'riego',
      });
    }

    if (data.temp_ambiente > 30) {
      recs.push({
        mensaje:
          'La temperatura ambiente es alta, evalúa sombra o ventilación adicional.',
        prioridad: 4,
        tipo: 'clima',
      });
    }

    if (data.hum_ambiente < 30) {
      recs.push({
        mensaje:
          'La humedad ambiente es baja, considera aumentar la humedad relativa.',
        prioridad: 3,
        tipo: 'clima',
      });
    }

    return recs;
  }

  async generateRecommendations(data: DetectAnomaliesDto) {
    const ruleRecs = this.ruleBasedRecommendations(data);

    const prompt = `
Eres un asistente agrícola experto.
Tienes estas mediciones de sensores (JSON):
${JSON.stringify(data)}

También tienes esta lista de recomendaciones iniciales basadas en reglas (JSON):
${JSON.stringify(ruleRecs)}

Tu tarea:
1. Evaluar si las recomendaciones son correctas.
2. Añadir recomendaciones adicionales si falta algo importante.
3. Ordenar por prioridad (1–5, donde 5 es más urgente).
4. Devolver un JSON con una lista "recomendaciones", cada una con:
   - "mensaje": string
   - "prioridad": 1-5
   - "tipo": "riego" | "nutricion" | "clima" | "plaga" | "otro"

Responde SOLO con:
{
  "recomendaciones": [
    {
      "mensaje": "string",
      "prioridad": 1-5,
      "tipo": "riego" | "nutricion" | "clima" | "plaga" | "otro"
    }
  ]
}
`;

    try {
      const respuesta = await this.callOpenAI(prompt);
      const recomendaciones = respuesta.recomendaciones ?? [];

      // Registrar recomendaciones en la base de datos si hay plantId
      if (data.plantId) {
        for (const rec of recomendaciones) {
          const dto: CreateRecommendationDto = {
            plantId: data.plantId,
            alertId: undefined,
            type: rec.tipo ?? 'otro',
            message: rec.mensaje,
            status: undefined,
          };

          await this.recommendationsService.create(dto);
        }
      }

      return { recomendaciones };
    } catch (error) {
      this.logger.error(
        'Error calling OpenAI API for recommendations generation',
        error,
      );
      throw error;
    }
  }

  /**
   * Análisis visual de la planta a partir de una imagen.
   * Por ahora deja el contrato listo y una implementación básica
   * que luego se puede conectar a un modelo de visión más avanzado.
   */
  async analyzePlantImage(file: any) {
    if (!file) {
      throw new Error('No se recibió archivo de imagen para análisis');
    }

    // Implementación placeholder explicativa para la demo.
    // Aquí se podría llamar a un modelo de visión propio o externo.
    const prompt = `
Eres un experto en diagnóstico visual de plantas.
Actualmente NO tienes acceso directo a la imagen (solo estamos definiendo contrato),
así que genera una respuesta de ejemplo realista para una planta con posible estrés hídrico leve.

Responde en JSON válido con la siguiente forma:
{
  "estado": "sana" | "leve" | "moderado" | "grave",
  "posibles_causas": [ "string" ],
  "recomendaciones": [ "string" ]
}
`;

    try {
      const result = await this.callOpenAI(prompt);
      return {
        ...result,
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      };
    } catch (error) {
      this.logger.error(
        'Error calling OpenAI API for image-based plant analysis',
        error,
      );
      throw error;
    }
  }
}

