import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SensorType } from './entities/sensor-type.entity';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';

@Injectable()
export class SensorTypesService {
  constructor(@InjectRepository(SensorType) private readonly repo: Repository<SensorType>) {}

  findByCode(code: string) {
    return this.repo.findOne({ where: { code } });
  }

  async create(dto: CreateSensorTypeDto) {
    const existing = await this.findByCode(dto.code);
    if (existing) throw new BadRequestException('Ya existe un sensor type con ese code.');

    const sensorType = this.repo.create(dto);
    return this.repo.save(sensorType);
  }

  findAll() {
    return this.repo.find();
  }
}
