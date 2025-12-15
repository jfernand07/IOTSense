import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plant } from './entities/plant.entity';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plant, User])],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
