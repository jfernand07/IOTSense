import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorTypeDto } from './create-sensor-type.dto';

export class UpdateSensorTypeDto extends PartialType(CreateSensorTypeDto) {}
