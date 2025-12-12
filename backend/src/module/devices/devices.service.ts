import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(@InjectRepository(Device) private readonly repo: Repository<Device>) {}

  findByExternalId(externalId: string) {
    return this.repo.findOne({ where: { externalId } });
  }

  async create(dto: CreateDeviceDto) {
    const existing = await this.findByExternalId(dto.externalId);
    if (existing) throw new BadRequestException('Ya existe un device con ese externalId.');

    const device = this.repo.create(dto);
    return this.repo.save(device);
  }

  findAll() {
    return this.repo.find();
  }
}
