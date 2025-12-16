import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sensor } from './entities/sensor.entity';
import { Device } from '../devices/entities/device.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async create(dto: CreateSensorDto): Promise<Sensor> {
    const device = await this.deviceRepo.findOne({
      where: { id: dto.deviceId },
    });

    if (!device) throw new NotFoundException('Dispositivo no encontrado');

    const sensor = this.sensorRepo.create({
      type: dto.type,
      unit: dto.unit,
      isActive: dto.isActive ?? true,
      device,
    });

    return this.sensorRepo.save(sensor);
  }

  async findAll(): Promise<Sensor[]> {
    return this.sensorRepo.find({ relations: ['device'] });
  }

  async findOne(id: number): Promise<Sensor | null> {
    return this.sensorRepo.findOne({
      where: { id },
      relations: ['device'],
    });
  }

  async update(id: number, dto: UpdateSensorDto): Promise<Sensor> {
    const sensor = await this.sensorRepo.findOneBy({ id });
    if (!sensor) throw new NotFoundException('Sensor no encontrado');

    if (dto.deviceId) {
      const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
      if (!device) throw new NotFoundException('Dispositivo no encontrado');
      sensor.device = device;
    }

    if (dto.type !== undefined) sensor.type = dto.type;
    if (dto.unit !== undefined) sensor.unit = dto.unit;
    if (dto.isActive !== undefined) sensor.isActive = dto.isActive;

    return this.sensorRepo.save(sensor);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.sensorRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Sensor no encontrado');
    return { message: 'Sensor eliminado correctamente' };
  }
}
