import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlantDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @Type(() => Number)
  @IsInt()
  ownerUserId: number;

  @Type(() => Number)
  @IsInt()
  plantTypeId: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsOptional()
  @IsDateString()
  datePlanted?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
