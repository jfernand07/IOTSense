import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PlantTypesService } from './plant-types.service';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('plant-types')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlantTypesController {
  constructor(private readonly service: PlantTypesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreatePlantTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.service.findAll();
  }
}
