import { Module } from '@nestjs/common';
import { SensorsControllerTsController } from './sensors.controller.ts.controller';
import { SensorsServicesTsService } from './sensors.services.ts.service';

@Module({
  controllers: [SensorsControllerTsController],
  providers: [SensorsServicesTsService]
})
export class SensorsModule {}
