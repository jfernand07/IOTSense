import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorType } from './entities/sensor-type.entity';
import { SensorTypesService } from './sensor-types.service';
import { SensorTypesController } from './sensor-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SensorType])],
  providers: [SensorTypesService],
  controllers: [SensorTypesController],
})
export class SensorTypesModule {}
