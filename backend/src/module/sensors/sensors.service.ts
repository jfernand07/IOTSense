import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { Device } from '../module/devices/entities/device.entity';
import { SensorType } from '../module/sensor-types/entities/sensor-type.entity';
import { Plant } from '../module/plants/entities/plant.entity';
import { SensorListItemDto } from './dto/sensor-list-item.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor) private readonly sensorRepo: Repository<Sensor>,
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
    @InjectRepository(SensorType) private readonly sensorTypeRepo: Repository<SensorType>,
    @InjectRepository(Plant) private readonly plantRepo: Repository<Plant>,
  ) {}

  findByExternalId(externalId: string) {
    return this.sensorRepo.findOne({ where: { externalId } });
  }

  async create(dto: CreateSensorDto) {
    const existing = await this.findByExternalId(dto.externalId);
    if (existing) throw new BadRequestException('Ya existe un sensor con ese externalId.');

    const device = await this.deviceRepo.findOne({ where: { id: dto.deviceId } });
    if (!device) throw new NotFoundException('Device no existe.');

    const sensorType = await this.sensorTypeRepo.findOne({ where: { id: dto.sensorTypeId } });
    if (!sensorType) throw new NotFoundException('SensorType no existe.');

    let plant: Plant | null = null;
    if (dto.plantId) {
      plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
      if (!plant) throw new NotFoundException('Plant no existe.');
    }

    const sensor = this.sensorRepo.create({
      name: dto.name,
      externalId: dto.externalId,
      pin: dto.pin ?? null,
      calibrationOffset: String(dto.calibrationOffset ?? 0),
      isActive: dto.isActive ?? true,
      device,
      sensorType,
      plant,
    });

    return this.sensorRepo.save(sensor);
  }

  async findAll(): Promise<SensorListItemDto[]> {
    return this.sensorRepo
      .createQueryBuilder('s')
      .innerJoin('s.device', 'd')
      .innerJoin('s.sensorType', 'st')
      .leftJoin('s.plant', 'p') // plant puede ser NULL
      .select([
        // Device
        'd.name AS "deviceName"',
        'd.externalId AS "deviceExternalId"',
        'd.description AS "deviceDescription"',
        'd.status AS "deviceStatus"',
        'd.location AS "deviceLocation"',

        // SensorType
        'st.displayName AS "sensorTypeDisplayName"',
        'st.description AS "sensorTypeDescription"',

        // Plant (opcional)
        'p.name AS "plantName"',
        'p.location AS "plantLocation"',

        // Sensor
        's.name AS "sensorName"',
        's.externalId AS "sensorExternalId"',
      ])
      .orderBy('s.id', 'DESC')
      .getRawMany<SensorListItemDto>();
  }
}
