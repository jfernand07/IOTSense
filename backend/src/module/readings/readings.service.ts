import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reading, ReadingQualityFlag } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
import { Sensor } from '../sensors/entities/sensor.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading) private readonly repo: Repository<Reading>,
    @InjectRepository(Sensor) private readonly sensorRepo: Repository<Sensor>,
  ) {}

  async create(dto: CreateReadingDto) {
    const sensor = await this.sensorRepo.findOne({ where: { id: dto.sensorId } });
    if (!sensor) throw new NotFoundException('Sensor no existe.');

    const reading = this.repo.create({
      sensor,
      value: String(dto.value),
      timestamp: new Date(dto.timestamp),
      qualityFlag: dto.qualityFlag ?? ReadingQualityFlag.OK,
      rawPayload: dto.rawPayload ?? null,
    });

    return this.repo.save(reading);
  }

  findAll() {
    return this.repo.find({
      relations: { sensor: true },
      order: { timestamp: 'DESC' },
      take: 100, // para no reventar la API
    });
  }
}
