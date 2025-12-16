import { PartialType } from '@nestjs/swagger';
import { CreateSensorThresholdDto } from './create-sensor-threshold.dto';

export class UpdateSensorThresholdDto extends PartialType(CreateSensorThresholdDto) {}
