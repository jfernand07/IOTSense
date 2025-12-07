import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reading } from './entities/reading.entity';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { Sensor } from '../sensors/entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reading, Sensor])],
  providers: [ReadingsService],
  controllers: [ReadingsController],
})
export class ReadingsModule {}
