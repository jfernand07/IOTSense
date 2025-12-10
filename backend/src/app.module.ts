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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get<string>('DB_SYNC') === 'true',
        logging: true,
      }),
    }),

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
export class AppModule { }
