import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { RecommendationsService } from '../mongodb/services/recommendations.service';
import { AlertsService } from '../mongodb/services/alerts.service';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(
    private configService: ConfigService,
    private recommendationsService: RecommendationsService,
    private alertsService: AlertsService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY not found in environment variables');
    }
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async detectAnomalies(data: {
    humidity: number;
    temp: number;
    lux: number;
    co2: number;
    lastValues: any[];
    idealRanges: string;
    plantId?: number;
    sensorId?: number;
    alertId?: number;
  }) {
    const prompt = `
Eres un motor experto en salud de plantas.
Recibes métricas ambientales y debes:
1. Detectar anomalías
2. Explicar su causa probable
3. Generar recomendaciones
4. Calificar severidad (1–5)

Datos:
- Humedad: ${data.humidity} %
- Temperatura: ${data.temp} °C
- Luz: ${data.lux} lux
- CO₂: ${data.co2} ppm
- Histórico: ${JSON.stringify(data.lastValues)}
- Rango ideal: ${data.idealRanges}

Responde en JSON válido:
{
  "anomalia": true/false,
  "tipo": "",
  "descripcion": "",
  "accion": "",
  "severidad": 1-5,
  "tipoRecomendacion": "WATERING|VENTILATION|TEMPERATURE_ADJUSTMENT|LIGHT_ADJUSTMENT|OTHER"
}
`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      const analysis = JSON.parse(content);

      // Si hay anomalía, crear alerta y recomendación
      if (analysis.anomalia && data.plantId) {
        // Determinar severidad de alerta
        let alertSeverity = 'INFO';
        if (analysis.severidad >= 4) alertSeverity = 'CRITICAL';
        else if (analysis.severidad >= 3) alertSeverity = 'WARNING';

        // Crear alerta
        const alert = await this.alertsService.create({
          plantId: data.plantId,
          sensorId: data.sensorId,
          type: analysis.tipo || 'ANOMALY_DETECTED',
          severity: alertSeverity,
          message: analysis.descripcion || 'Anomalía detectada por IA',
          status: 'OPEN',
          sensorData: {
            value: data.temp || data.humidity || data.lux || data.co2,
            unit: 'unknown',
          },
        });

        // Crear recomendación
        const recommendation = await this.recommendationsService.create({
          plantId: data.plantId,
          alertId: data.alertId,
          sensorId: data.sensorId,
          type: analysis.tipoRecomendacion || 'OTHER',
          message: analysis.accion || analysis.descripcion || 'Recomendación generada por IA',
          status: 'PENDING',
          severity: analysis.severidad || 1,
          aiAnalysis: {
            anomaly: analysis.anomalia,
            description: analysis.descripcion,
            action: analysis.accion,
            confidence: 0.8,
          },
          context: {
            humidity: data.humidity,
            temperature: data.temp,
            lux: data.lux,
            co2: data.co2,
            idealRanges: data.idealRanges,
          },
        });

        return {
          ...analysis,
          alertId: (alert as any)._id || (alert as any).id,
          recommendationId: (recommendation as any)._id || (recommendation as any).id,
        };
      }

      return analysis;
    } catch (error) {
      this.logger.error('Error calling OpenAI API', error);
      throw error;
    }
  }
}
