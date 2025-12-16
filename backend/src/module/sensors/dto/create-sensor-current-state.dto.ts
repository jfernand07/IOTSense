import { IsNumber, IsInt, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorCurrentStateDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  @IsInt()
  @Type(() => Number)
  sensor_id: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  last_value: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  last_read_at: Date;

  @ApiProperty()
  @IsString()
  status: string;
}
