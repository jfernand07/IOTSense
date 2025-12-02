import { Module } from '@nestjs/common';
import { AlertsServicesTsService } from './alerts.services.ts.service';
import { AlertsControllerTsController } from './alerts.controller.ts.controller';

@Module({
  providers: [AlertsServicesTsService],
  controllers: [AlertsControllerTsController]
})
export class AlertsModule {}
