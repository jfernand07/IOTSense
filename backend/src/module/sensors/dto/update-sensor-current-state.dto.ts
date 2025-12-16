import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorCurrentStateDto } from './create-sensor-current-state.dto';

export class UpdateSensorCurrentStateDto extends PartialType(CreateSensorCurrentStateDto) {}
