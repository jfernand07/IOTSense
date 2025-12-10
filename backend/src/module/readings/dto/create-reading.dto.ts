import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsObject } from 'class-validator';
import { ReadingQualityFlag } from '../entities/reading.entity';

export class CreateReadingDto {
  @Type(() => Number)
  @IsInt()
  sensorId: number;

  @Type(() => Number)
  @IsNumber()
  value: number;

  @IsDateString()
  timestamp: string; // ISO

  @IsOptional()
  @IsEnum(ReadingQualityFlag)
  qualityFlag?: ReadingQualityFlag;

  @IsOptional()
  @IsObject()
  rawPayload?: Record<string, any>;
}
