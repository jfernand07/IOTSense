import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('IA')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('detectar-anomalias')
  @ApiOperation({ summary: 'Detectar anomalías en lecturas' })
  @ApiResponse({ status: 201, description: 'Resultado del análisis de IA.' })
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
