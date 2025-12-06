import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantTypesService } from './plant-types.service';
import { PlantTypesController } from './plant-types.controller';
import { PlantType } from './entities/plant-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantType])],
  providers: [PlantTypesService],
  controllers: [PlantTypesController],
})
export class PlantTypesModule {}
