import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly service: PlantsService) {}

  @Post()
  create(@Body() dto: CreatePlantDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
