import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sensor } from './entities/sensor.entity';
import { Device } from '../devices/entities/device.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ReadingsService } from '../../mongodb/services/readings.service';
import { LogsService } from '../../mongodb/services/logs.service';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    private readonly readingsService: ReadingsService,
    private readonly logsService: LogsService,
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

  async createReading(readingData: {
    sensorId: number;
    value: number;
    timestamp?: Date;
    qualityFlag?: string;
    rawPayload?: any;
    sensorType?: string;
    unit?: string;
    deviceId?: number;
    plantId?: number;
  }): Promise<any> {
    const sensor = await this.sensorRepo.findOne({
      where: { id: readingData.sensorId },
      relations: ['device', 'device.plant'],
    });

    if (!sensor) {
      throw new NotFoundException('Sensor no encontrado');
    }

    // Obtener información adicional del sensor si no está en readingData
    const reading = {
      sensorId: readingData.sensorId,
      value: readingData.value,
      timestamp: readingData.timestamp || new Date(),
      qualityFlag: readingData.qualityFlag || 'OK',
      rawPayload: readingData.rawPayload,
      sensorType: readingData.sensorType || sensor.type,
      unit: readingData.unit || sensor.unit?.toString(),
      deviceId: readingData.deviceId || sensor.device?.id,
      plantId: readingData.plantId || sensor.device?.plant?.id,
    };

    // Guardar en MongoDB
    const savedReading = await this.readingsService.create(reading);

    // Crear log si es temperatura o humedad (interior o exterior)
    const sensorType = sensor.type.toLowerCase();
    if (
      sensorType.includes('temperatura') ||
      sensorType.includes('humedad') ||
      sensorType.includes('temp') ||
      sensorType.includes('humidity')
    ) {
      const location = sensor.device?.location?.toLowerCase().includes('exterior')
        ? 'exterior'
        : 'interior';

      await this.logsService.create({
        sensorId: readingData.sensorId,
        sensorType: reading.sensorType || 'unknown',
        location,
        value: readingData.value,
        unit: reading.unit || 'unknown',
        timestamp: reading.timestamp,
        deviceId: reading.deviceId,
        plantId: reading.plantId,
        status: reading.qualityFlag || 'OK',
        metadata: reading.rawPayload,
      });
    }

    return savedReading;
  }
}
