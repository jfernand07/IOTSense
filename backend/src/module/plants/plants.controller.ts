import { Body, Controller, Get, Post, Patch, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Plantas')
@ApiBearerAuth()
@Controller('plants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlantsController {
  constructor(private readonly service: PlantsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Crear una planta' })
  @ApiResponse({ status: 201, description: 'Planta creada exitosamente.' })
  create(@Body() dto: CreatePlantDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Listar todas las plantas' })
  @ApiResponse({ status: 200, description: 'Listado de plantas.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener una planta por ID' })
  @ApiResponse({ status: 200, description: 'Planta encontrada.' })
  @ApiResponse({ status: 404, description: 'Planta no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Actualizar una planta' })
  @ApiResponse({ status: 200, description: 'Planta actualizada.' })
  @ApiResponse({ status: 404, description: 'Planta no encontrada.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlantDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar una planta' })
  @ApiResponse({ status: 200, description: 'Planta eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Planta no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
