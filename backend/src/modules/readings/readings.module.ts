import { Module } from '@nestjs/common';
import { ReadindsServicesTsService } from './readinds.services.ts.service';
import { ReadingsControllerTsController } from './readings.controller.ts.controller';

@Module({
  providers: [ReadindsServicesTsService],
  controllers: [ReadingsControllerTsController]
})
export class ReadingsModule {}
