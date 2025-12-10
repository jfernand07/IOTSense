import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSensorDto {
  @Type(() => Number)
  @IsInt()
  deviceId: number;

  @Type(() => Number)
  @IsInt()
  sensorTypeId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  plantId?: number;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  externalId: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  pin?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  calibrationOffset?: number; // si no llega -> default 0

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
