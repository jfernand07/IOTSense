import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Sensores')
@ApiBearerAuth()
@Controller('sensors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Registrar un sensor' })
  @ApiResponse({ status: 201, description: 'Sensor creado correctamente.' })
  create(@Body() dto: CreateSensorDto) {
    return this.sensorsService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Listar sensores' })
  @ApiResponse({ status: 200, description: 'Listado de sensores.' })
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener un sensor por ID' })
  @ApiResponse({ status: 200, description: 'Sensor encontrado.' })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const sensor = await this.sensorsService.findOne(id);
    if (!sensor) throw new NotFoundException('Sensor no encontrado');
    return sensor;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar un sensor' })
  @ApiResponse({ status: 200, description: 'Sensor actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSensorDto) {
    return this.sensorsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar un sensor' })
  @ApiResponse({ status: 200, description: 'Sensor eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.remove(id);
  }
}
