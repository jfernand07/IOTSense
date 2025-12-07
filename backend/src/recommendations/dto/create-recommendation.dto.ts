import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { RecommendationStatus } from '../entities/recommendation.entity';

export class CreateRecommendationDto {
  @Type(() => Number)
  @IsInt()
  plantId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  alertId?: number;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsString()
  message: string;

  // opcional: si no viene, queda PENDING por default
  @IsOptional()
  @IsEnum(RecommendationStatus)
  status?: RecommendationStatus;
}
