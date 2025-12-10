import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sensor } from './entities/sensor.entity';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { Device } from '../devices/entities/device.entity';
import { SensorType } from '../sensor-types/entities/sensor-type.entity';
import { Plant } from '../plants/entities/plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, Device, SensorType, Plant])],
  providers: [SensorsService],
  controllers: [SensorsController],
})
export class SensorsModule {}
