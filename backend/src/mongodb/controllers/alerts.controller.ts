import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AlertsService } from '../services/alerts.service';
import { JwtAuthGuard } from '../../module/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../module/auth/guards/roles.guard';
import { Roles } from '../../module/auth/decorators/roles.decorator';
import { UserRole } from '../../module/users/entities/user.entity';

@ApiTags('Alertas MongoDB')
@ApiBearerAuth()
@Controller('mongodb/alerts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Crear una nueva alerta' })
  @ApiResponse({ status: 201, description: 'Alerta creada correctamente.' })
  async create(@Body() alertData: any) {
    return this.alertsService.create(alertData);
  }

  @Get('plant/:plantId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener alertas por planta' })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de alertas.' })
  async findByPlant(
    @Param('plantId', ParseIntPipe) plantId: number,
    @Query('status') status?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.alertsService.findByPlant(
      plantId,
      status,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
    );
  }

  @Get('sensor/:sensorId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener alertas por sensor' })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Listado de alertas.' })
  async findBySensor(
    @Param('sensorId', ParseIntPipe) sensorId: number,
    @Query('status') status?: string,
  ) {
    return this.alertsService.findBySensor(sensorId, status);
  }

  @Get('open')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener alertas abiertas' })
  @ApiQuery({ name: 'plantId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de alertas abiertas.' })
  async getOpenAlerts(@Query('plantId') plantId?: number) {
    return this.alertsService.getOpenAlerts(
      plantId ? Number(plantId) : undefined,
    );
  }

  @Get('severity/:severity')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener alertas por severidad' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de alertas.' })
  async getBySeverity(
    @Param('severity') severity: string,
    @Query('limit') limit?: number,
  ) {
    return this.alertsService.getAlertsBySeverity(
      severity,
      limit ? Number(limit) : 50,
    );
  }

  @Get('history')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener historial de alertas' })
  @ApiQuery({ name: 'plantId', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Historial de alertas.' })
  async getHistory(
    @Query('plantId') plantId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.alertsService.getHistory(
      plantId ? Number(plantId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
    );
  }

  @Patch(':id/resolve')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Resolver una alerta' })
  @ApiResponse({ status: 200, description: 'Alerta resuelta correctamente.' })
  async resolveAlert(
    @Param('id') id: string,
    @Body() body: { resolvedByUserId?: number },
  ) {
    return this.alertsService.resolveAlert(id, body.resolvedByUserId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar alerta' })
  @ApiResponse({ status: 200, description: 'Alerta eliminada correctamente.' })
  async delete(@Param('id') id: string) {
    await this.alertsService.delete(id);
    return { message: 'Alerta eliminada correctamente' };
  }
}

