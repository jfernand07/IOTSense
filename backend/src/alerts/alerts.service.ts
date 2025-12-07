import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Alert, AlertStatus } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Plant } from '../plants/entities/plant.entity';
import { Sensor } from '../sensors/entities/sensor.entity';
import { AlertListItemDto } from './dto/alert-list-item.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert) private readonly alertRepo: Repository<Alert>,
    @InjectRepository(Plant) private readonly plantRepo: Repository<Plant>,
    @InjectRepository(Sensor) private readonly sensorRepo: Repository<Sensor>,
  ) {}

  async create(dto: CreateAlertDto) {
    const plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
    if (!plant) throw new NotFoundException('Plant no existe.');

    let sensor: Sensor | null = null;
    if (dto.sensorId) {
      sensor = await this.sensorRepo.findOne({ where: { id: dto.sensorId } });
      if (!sensor) throw new NotFoundException('Sensor no existe.');
    }

    const alert = this.alertRepo.create({
      plant,
      sensor,
      type: dto.type,
      severity: dto.severity,
      message: dto.message,
      status: AlertStatus.OPEN,
      resolvedAt: null,
      resolvedBy: null,
    });

    return this.alertRepo.save(alert);
  }

  async findAll(): Promise<AlertListItemDto[]> {
    return this.alertRepo
      .createQueryBuilder('a')
      .innerJoin('a.plant', 'p')
      .leftJoin('a.sensor', 's')
      .select([
        'a.type AS "type"',
        'a.severity AS "severity"',
        'a.message AS "message"',
        'a.status AS "status"',

        'p.name AS "plantName"',
        'p.location AS "plantLocation"',

        's.name AS "sensorName"',
        's.externalId AS "sensorExternalId"',
      ])
      .orderBy('a.id', 'DESC')
      .getRawMany<AlertListItemDto>();
  }
}
