import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
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
    type: string;

    @IsString()
    message: string;

    @IsOptional()
    @IsEnum(RecommendationStatus)
    status?: RecommendationStatus;
}
