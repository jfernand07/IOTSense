import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { RecommendationStatus } from '../entities/recommendation.entity';

export class UpdateRecommendationDto {
  @IsOptional()
  @IsEnum(RecommendationStatus)
  status?: RecommendationStatus;

  // si se marca APPLIED, normalmente setearíamos executedAt y executedByUserId
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  executedByUserId?: number;
}
