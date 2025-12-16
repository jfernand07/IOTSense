import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { LogsService } from '../services/logs.service';
import { JwtAuthGuard } from '../../module/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../module/auth/guards/roles.guard';
import { Roles } from '../../module/auth/decorators/roles.decorator';
import { UserRole } from '../../module/users/entities/user.entity';

@ApiTags('Logs MongoDB')
@ApiBearerAuth()
@Controller('mongodb/logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Crear un nuevo log' })
  @ApiResponse({ status: 201, description: 'Log creado correctamente.' })
  async create(@Body() logData: any) {
    return this.logsService.create(logData);
  }

  @Post('batch')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear múltiples logs' })
  @ApiResponse({ status: 201, description: 'Logs creados correctamente.' })
  async createBatch(@Body() logsData: any[]) {
    return this.logsService.createBatch(logsData);
  }

  @Get('sensor/:sensorId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener logs por sensor' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de logs.' })
  async findBySensor(
    @Param('sensorId', ParseIntPipe) sensorId: number,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.logsService.findBySensor(
      sensorId,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
  );
  }

  @Get('type/:sensorType/location/:location')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener logs por tipo y ubicación' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de logs.' })
  async findByTypeAndLocation(
    @Param('sensorType') sensorType: string,
    @Param('location') location: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.logsService.findBySensorTypeAndLocation(
      sensorType,
      location,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
    );
  }

  @Get('sensor/:sensorId/latest')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener el último log de un sensor' })
  @ApiResponse({ status: 200, description: 'Último log.' })
  async getLatest(@Param('sensorId', ParseIntPipe) sensorId: number) {
    return this.logsService.getLatestBySensor(sensorId);
  }

  @Get('history/:sensorType')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener historial por tipo de sensor' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Historial de logs.' })
  async getHistory(
    @Param('sensorType') sensorType: string,
    @Query('days') days?: number,
  ) {
    return this.logsService.getHistoryBySensorType(
      sensorType,
      days ? Number(days) : 7,
    );
  }
}

