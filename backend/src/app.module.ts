import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './module/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlantTypesModule } from './module/plant-types/plant-types.module';
import { DevicesModule } from './module/devices/devices.module';
import { SensorTypesModule } from './module/sensor-types/sensor-types.module';
import { PlantsModule } from './module/plants/plants.module';
import { SensorsModule } from './module/sensors/sensors.module';
import { AlertsModule } from './module/alerts/alerts.module';
import { RecommendationsModule } from './module/recommendations/recommendations.module';
import { ReadingsModule } from './module/readings/readings.module';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './module/auth/auth.module';
import { databaseConfig } from './config/dataBase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    AuthModule,
    UsersModule,
    PlantTypesModule,
    DevicesModule,
    SensorTypesModule,
    PlantsModule,
    SensorsModule,
    AlertsModule,
    RecommendationsModule,
    ReadingsModule,
    AiModule,
  ],
})
export class AppModule {}
