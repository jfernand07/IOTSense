import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { WebsocketModule } from './websocket/websocket.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { IotCloudModule } from './iot-cloud/iot-cloud.module';
import { PlantsModule } from './plants/plants.module';
import { SensorsModule } from './sensors/sensors.module';
import { ReadingsModule } from './readings/readings.module';
import { RulesEngineModule } from './rules-engine/rules-engine.module';
import { AlertsModule } from './alerts/alerts.module';
import { RecomendationsModule } from './recomendations/recomendations.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, RolesModule, WebsocketModule, SchedulerModule, IotCloudModule, PlantsModule, SensorsModule, ReadingsModule, RulesEngineModule, AlertsModule, RecomendationsModule]
})
export class ModulesModule {}
