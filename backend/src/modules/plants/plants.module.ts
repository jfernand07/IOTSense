import { Module } from '@nestjs/common';
import { PlantsServicesTsService } from './plants.services.ts.service';
import { PlantsControllerTsController } from './plants.controller.ts.controller';

@Module({
  providers: [PlantsServicesTsService],
  controllers: [PlantsControllerTsController]
})
export class PlantsModule {}
