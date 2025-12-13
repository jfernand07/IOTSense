import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SensorTypesService } from './sensor-types.service';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('sensor-types')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SensorTypesController {
  constructor(private readonly service: SensorTypesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateSensorTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.service.findAll();
  }
}
