import { PartialType } from '@nestjs/swagger';
import { CreateSensorCurrentStateDto } from './create-sensor-current-state.dto';

export class UpdateSensorCurrentStateDto extends PartialType(CreateSensorCurrentStateDto) {}
