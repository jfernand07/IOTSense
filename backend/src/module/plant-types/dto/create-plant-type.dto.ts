import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlantTypeDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // helper: numeric optional
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalTempMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalTempMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalAirHumidityMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalAirHumidityMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalSoilMoistureMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalSoilMoistureMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalLightMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalLightMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalCo2Min?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  optimalCo2Max?: number;
}
