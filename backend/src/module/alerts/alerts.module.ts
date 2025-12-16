import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Alert } from './entities/alert.entity';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { Plant } from '../plants/entities/plant.entity';
import { Sensor } from '../sensors/entities/sensor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Alert, Plant, Sensor])],
    providers: [AlertsService],
    controllers: [AlertsController],
    exports: [AlertsService],
})
export class AlertsModule { }
