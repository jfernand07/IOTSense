import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sensor } from './entities/sensor.entity';
import { Device } from '../devices/entities/device.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ReadingsService } from '../../mongodb/services/readings.service';
import { LogsService } from '../../mongodb/services/logs.service';
import { AiService } from '../../ai/ai.service';
import { DetectAnomaliesDto } from '../../ai/dto/detect-anomalies.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    private readonly readingsService: ReadingsService,
    private readonly logsService: LogsService,
    private readonly aiService: AiService,
  ) { }

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

    // --- TRIGGER AI ANALYSIS ---
    if (reading.plantId) {
      // Fire-and-forget to not block the response
      this.triggerAiAnalysis(reading.plantId, reading).catch((err) =>
        console.error('Error triggering AI analysis:', err),
      );
    }

    return savedReading;
  }

  private async triggerAiAnalysis(plantId: number, currentReading: any) {
    const context = await this.gatherPlantContext(plantId);

    // Override with the fresh reading value
    if (currentReading.sensorType) {
      const type = currentReading.sensorType.toLowerCase();
      if (type.includes('temp') && type.includes('amb')) {
        context.temp_ambiente = currentReading.value;
      } else if (type.includes('hum') && type.includes('amb')) {
        context.hum_ambiente = currentReading.value;
      } else if (type.includes('hum') && type.includes('suelo')) {
        context.hum_suelo = currentReading.value;
      } else if (type.includes('temp') && type.includes('suelo')) {
        context.temp_suelo = currentReading.value;
      }
    }
    context.timestamp = currentReading.timestamp.toISOString();
    context.plantId = plantId;
    context.sensorId = currentReading.sensorId;

    // Fetch history for this specific sensor to pass to AI
    // (AI expects history of the *current* metric being analyzed usually, or a mix)
    // For now, let's pass history of the current sensor
    const history = await this.readingsService.findBySensor(
      currentReading.sensorId,
      10,
    );
    // Map history to the DTO structure (simplified)
    context.lastValues = history.map((h: any) => ({
      ...context, // copy current context
      // override with historical value for this specific metric?
      // actually DetectAnomaliesDto.lastValues expects an array of DetectAnomaliesDto
      // which implies full snapshots. This is hard to reconstruct perfectly.
      // We will just fill the relevant field in the historical objects.
      temp_ambiente: h.sensorType.includes('temp') && h.sensorType.includes('amb') ? h.value : context.temp_ambiente,
      hum_suelo: h.sensorType.includes('hum') && h.sensorType.includes('suelo') ? h.value : context.hum_suelo,
      // ... simplified approach:
      timestamp: h.timestamp instanceof Date ? h.timestamp.toISOString() : h.timestamp,
    }));

    await this.aiService.detectAnomalies(context);
  }

  private async gatherPlantContext(plantId: number): Promise<DetectAnomaliesDto> {
    const sensors = await this.sensorRepo.find({
      where: { device: { plant: { id: plantId } } },
      relations: ['currentState', 'device', 'device.plant'],
    });

    const dto = new DetectAnomaliesDto();
    // Default values
    dto.temp_ambiente = 25;
    dto.hum_ambiente = 50;
    dto.hum_suelo = 50;
    dto.temp_suelo = 20;

    for (const s of sensors) {
      if (!s.currentState) continue;
      const type = s.type.toLowerCase();
      const val = s.currentState.last_value;

      if (type.includes('temp') && type.includes('amb')) {
        dto.temp_ambiente = val;
      } else if (type.includes('hum') && type.includes('amb')) {
        dto.hum_ambiente = val;
      } else if (type.includes('hum') && type.includes('suelo')) {
        dto.hum_suelo = val;
      } else if (type.includes('temp') && type.includes('suelo')) {
        dto.temp_suelo = val;
      }
    }
    return dto;
  }
}
