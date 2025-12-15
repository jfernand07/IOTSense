import { PartialType } from '@nestjs/swagger';
import { CreateSensorDto } from './create-sensor.dto';

export class UpdateSensorDto extends PartialType(CreateSensorDto) {}
