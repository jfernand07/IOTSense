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
import { ReadingsService } from '../services/readings.service';
import { JwtAuthGuard } from '../../module/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../module/auth/guards/roles.guard';
import { Roles } from '../../module/auth/decorators/roles.decorator';
import { UserRole } from '../../module/users/entities/user.entity';

@ApiTags('Lecturas MongoDB')
@ApiBearerAuth()
@Controller('mongodb/readings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Crear una nueva lectura' })
  @ApiResponse({ status: 201, description: 'Lectura creada correctamente.' })
  async create(@Body() readingData: any) {
    return this.readingsService.create(readingData);
  }

  @Post('batch')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear múltiples lecturas' })
  @ApiResponse({ status: 201, description: 'Lecturas creadas correctamente.' })
  async createBatch(@Body() readingsData: any[]) {
    return this.readingsService.createBatch(readingsData);
  }

  @Get('sensor/:sensorId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener lecturas por sensor' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de lecturas.' })
  async findBySensor(
    @Param('sensorId', ParseIntPipe) sensorId: number,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.readingsService.findBySensor(
      sensorId,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
    );
  }

  @Get('device/:deviceId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener lecturas por dispositivo' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de lecturas.' })
  async findByDevice(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.readingsService.findByDevice(
      deviceId,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
    );
  }

  @Get('sensor/:sensorId/latest')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener la última lectura de un sensor' })
  @ApiResponse({ status: 200, description: 'Última lectura.' })
  async getLatest(@Param('sensorId', ParseIntPipe) sensorId: number) {
    return this.readingsService.getLatestBySensor(sensorId);
  }

  @Get('sensor/:sensorId/minute')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener lecturas agrupadas por minuto' })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Lecturas agrupadas por minuto.' })
  async getMinuteReadings(
    @Param('sensorId', ParseIntPipe) sensorId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.readingsService.getMinuteReadings(
      sensorId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}

