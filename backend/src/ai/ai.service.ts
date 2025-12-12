import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {
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
    lastValues: any[]; // Or specific type e.g. number[]
    idealRanges: string;
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
  "severidad": 1-5
}
`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Or gpt-4 depending on budget/preference
        messages: [{ role: 'system', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }
      return JSON.parse(content);
    } catch (error) {
      this.logger.error('Error calling OpenAI API', error);
      throw error;
    }
  }
}
