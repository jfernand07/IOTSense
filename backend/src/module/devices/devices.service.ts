import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Plant } from '../plants/entities/plant.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    @InjectRepository(Plant)
    private readonly plantRepo: Repository<Plant>,
  ) {}

  async create(dto: CreateDeviceDto): Promise<Device> {
    const plant = await this.plantRepo.findOne({
      where: { id: dto.plantId },
    });

    if (!plant) {
      throw new NotFoundException('La planta asociada no existe.');
    }

    const device = this.deviceRepo.create({
      name: dto.name,
      location: dto.location,
      hasCamera: dto.hasCamera ?? false,
      isActive: dto.isActive ?? true,
      plant,
    });

    return this.deviceRepo.save(device);
  }

  findAll(): Promise<Device[]> {
    return this.deviceRepo.find({
      relations: ['plant'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceRepo.findOne({
      where: { id },
      relations: ['plant', 'sensors'],
    });

    if (!device) {
      throw new NotFoundException('Dispositivo no encontrado.');
    }

    return device;
  }

  async update(id: number, dto: UpdateDeviceDto): Promise<Device> {
    const device = await this.deviceRepo.findOne({
      where: { id },
      relations: ['plant'],
    });

    if (!device) {
      throw new NotFoundException('Dispositivo no encontrado.');
    }

    if (dto.name !== undefined) device.name = dto.name;
    if (dto.location !== undefined) device.location = dto.location;
    if (dto.hasCamera !== undefined) device.hasCamera = dto.hasCamera;
    if (dto.isActive !== undefined) device.isActive = dto.isActive;

    if (dto.plantId !== undefined) {
      const plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
      if (!plant) {
        throw new NotFoundException('La nueva planta asociada no existe.');
      }
      device.plant = plant;
    }

    return this.deviceRepo.save(device);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.deviceRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Dispositivo no encontrado.');
    }

    return { message: 'Dispositivo eliminado correctamente.' };
  }
}
