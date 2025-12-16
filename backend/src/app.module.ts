import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './module/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevicesModule } from './module/devices/devices.module';
import { PlantsModule } from './module/plants/plants.module';
import { SensorsModule } from './module/sensors/sensors.module';
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
    DevicesModule,
    PlantsModule,
    SensorsModule,
    AiModule,
  ],
})
export class AppModule {}
