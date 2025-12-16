import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorThresholdDto } from './create-sensor-threshold.dto';

export class UpdateSensorThresholdDto extends PartialType(CreateSensorThresholdDto) {}
