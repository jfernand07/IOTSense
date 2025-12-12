import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantType } from './entities/plant-type.entity';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';

@Injectable()
export class PlantTypesService {
  constructor(@InjectRepository(PlantType) private readonly repo: Repository<PlantType>) {}

  findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

  async create(dto: CreatePlantTypeDto) {
    const existing = await this.findByName(dto.name);
    if (existing) throw new BadRequestException('Ya existe un plant type con ese nombre.');

    const plantType = this.repo.create(dto as any); // (explico abajo)
    return this.repo.save(plantType);
  }

  findAll() {
    return this.repo.find();
  }
}
