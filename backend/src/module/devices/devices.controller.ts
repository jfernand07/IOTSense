import { Body, Controller, Get, Post, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Dispositivos')
@ApiBearerAuth()
@Controller('devices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Registrar dispositivo' })
  @ApiResponse({ status: 201, description: 'Dispositivo creado.' })
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Listar todos los dispositivos' })
  @ApiResponse({ status: 200, description: 'Listado de dispositivos.' })
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener un dispositivo por ID' })
  @ApiResponse({ status: 200, description: 'Dispositivo encontrado.' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar un dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo actualizado.' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDeviceDto) {
    return this.devicesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar un dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.remove(id);
  }
}
