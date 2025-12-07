import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorTypesService } from './sensor-types.service';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';

@Controller('sensor-types')
export class SensorTypesController {
  constructor(private readonly service: SensorTypesService) {}

  @Post()
  create(@Body() dto: CreateSensorTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
