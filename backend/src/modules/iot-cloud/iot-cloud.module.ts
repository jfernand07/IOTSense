import { Module } from '@nestjs/common';
import { IotCloudServicesTsService } from './iot-cloud.services.ts.service';

@Module({
  providers: [IotCloudServicesTsService]
})
export class IotCloudModule {}
