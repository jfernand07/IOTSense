import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { User } from '../users/entities/user.entity';
import { PlantType } from '../plant-types/entities/plant-type.entity';
import { PlantListItemDto } from './dto/plant-list-item.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant) private readonly plantRepo: Repository<Plant>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(PlantType) private readonly plantTypeRepo: Repository<PlantType>,
  ) {}

  async create(dto: CreatePlantDto) {
    const owner = await this.userRepo.findOne({ where: { id: dto.ownerUserId } });
    if (!owner) throw new NotFoundException('Owner user no existe.');

    const plantType = await this.plantTypeRepo.findOne({ where: { id: dto.plantTypeId } });
    if (!plantType) throw new NotFoundException('Plant type no existe.');

    const plant = this.plantRepo.create({
      name: dto.name,
      location: dto.location ?? null,
      datePlanted: dto.datePlanted ?? null,
      isActive: dto.isActive ?? true,
      notes: dto.notes ?? null,
      imageUrl: dto.imageUrl ?? null,
      owner,
      plantType,
    });

    // (opcional) reglas simples: tempMin <= tempMax etc. eso va en plant_type, no aquí.
    return this.plantRepo.save(plant);
  }

  async findAll(): Promise<PlantListItemDto[]> {
    const rows = await this.plantRepo
      .createQueryBuilder('p')
      .innerJoin('p.owner', 'u')
      .innerJoin('p.plantType', 'pt')
      .select([
        'p.name AS "name"',
        'p.location AS "location"',
        'p.datePlanted AS "datePlanted"',
        'u.name AS "ownerName"',
        'pt.name AS "plantTypeName"',
      ])
      .orderBy('p.id', 'DESC')
      .getRawMany<PlantListItemDto>();

    return rows;
  }
}
