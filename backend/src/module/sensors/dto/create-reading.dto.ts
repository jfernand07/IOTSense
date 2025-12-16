import { IsNumber, IsInt, IsString, IsOptional, IsDate, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  sensorId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  value: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  timestamp?: Date;

  @ApiProperty({ required: false, default: 'OK' })
  @IsOptional()
  @IsString()
  qualityFlag?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  rawPayload?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sensorType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  deviceId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  plantId?: number;
}

