import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { DetectAnomaliesDto } from './dto/detect-anomalies.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('detectar-anomalias')
  async detectAnomalies(@Body() body: DetectAnomaliesDto) {
    return this.aiService.detectAnomalies(body);
  }

  @Post('recomendaciones')
  async getRecommendations(@Body() body: DetectAnomaliesDto) {
    return this.aiService.generateRecommendations(body);
  }

  @Post('analisis-imagen')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeImage(@UploadedFile() file: any) {
    return this.aiService.analyzePlantImage(file);
  }
}

