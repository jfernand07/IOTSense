import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlantTypesService } from './plant-types.service';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';

@Controller('plant-types')
export class PlantTypesController {
  constructor(private readonly service: PlantTypesService) {}

  @Post()
  create(@Body() dto: CreatePlantTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
