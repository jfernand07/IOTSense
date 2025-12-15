import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorThresholdDto {
  @ApiProperty()
  @IsString()
  sensor_type: string;

  @ApiProperty()
  @IsNumber()
  min_value: number;

  @ApiProperty()
  @IsNumber()
  max_value: number;

  @ApiProperty()
  @IsString()
  severity: string;
}
