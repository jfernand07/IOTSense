import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('detectar-anomalias')
  async detectAnomalies(
    @Body()
    body: {
      humidity: number;
      temp: number;
      lux: number;
      co2: number;
      lastValues: any[];
      idealRanges: string;
    },
  ) {
    return this.aiService.detectAnomalies(body);
  }
}
