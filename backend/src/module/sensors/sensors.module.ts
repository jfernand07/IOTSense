import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sensor } from './entities/sensor.entity';
import { SensorCurrentState } from './entities/sensor-current-state.entity';
import { SensorThreshold } from './entities/sensor-threshold.entity';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { Device } from '../devices/entities/device.entity';
import { Plant } from '../plants/entities/plant.entity';
import { MongodbModule } from '../../mongodb/mongodb.module';
import { AiModule } from '../../ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor, SensorCurrentState, SensorThreshold, Device, Plant]),
    MongodbModule,
    AiModule,
  ],
  providers: [SensorsService],
  controllers: [SensorsController],
})
export class SensorsModule { }
