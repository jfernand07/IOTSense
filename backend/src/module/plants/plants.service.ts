// src/plants/plants.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepo: Repository<Plant>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePlantDto): Promise<Plant> {
    const owner = await this.userRepo.findOne({
      where: { id: dto.ownerUserId },
    });

    if (!owner) {
      throw new NotFoundException('El usuario propietario no existe.');
    }

    const plant = this.plantRepo.create({
      name: dto.name,
      species: dto.species,
      description: dto.description,
      owner,
    });

    return this.plantRepo.save(plant);
  }

  async findAll(): Promise<Plant[]> {
    return this.plantRepo.find({
      relations: ['owner'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Plant> {
    const plant = await this.plantRepo.findOne({
      where: { id },
      relations: ['owner', 'devices'],
    });

    if (!plant) {
      throw new NotFoundException('Planta no encontrada');
    }

    return plant;
  }

  async update(id: number, dto: UpdatePlantDto): Promise<Plant> {
    const plant = await this.plantRepo.findOne({ where: { id } });

    if (!plant) {
      throw new NotFoundException('Planta no encontrada');
    }

    if (dto.name !== undefined) plant.name = dto.name;
    if (dto.species !== undefined) plant.species = dto.species;
    if (dto.description !== undefined) plant.description = dto.description;

    if (dto.ownerUserId !== undefined) {
      const owner = await this.userRepo.findOne({
        where: { id: dto.ownerUserId },
      });
      if (!owner) throw new NotFoundException('Nuevo usuario propietario no existe');
      plant.owner = owner;
    }

    return this.plantRepo.save(plant);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.plantRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Planta no encontrada');
    }

    return { message: 'Planta eliminada correctamente' };
  }
}
