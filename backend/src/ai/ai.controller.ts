import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../module/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../module/auth/guards/roles.guard';
import { Roles } from '../module/auth/decorators/roles.decorator';
import { UserRole } from '../module/users/entities/user.entity';

@ApiTags('IA')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('detectar-anomalias')
  @Roles(UserRole.ADMIN, UserRole.USER)
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
      plantId?: number;
      sensorId?: number;
      alertId?: number;
    },
  ) {
    return this.aiService.detectAnomalies(body);
  }
}
