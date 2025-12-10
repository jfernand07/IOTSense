import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly service: SensorsService) {}

  @Post()
  create(@Body() dto: CreateSensorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
