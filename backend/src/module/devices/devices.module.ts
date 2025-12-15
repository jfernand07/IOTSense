import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device } from './entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from '../plants/entities/plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Plant])],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
