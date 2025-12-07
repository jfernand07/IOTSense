import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSensorTypeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  displayName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  unit: string;

  @IsOptional()
  @IsString()
  description?: string;
}
