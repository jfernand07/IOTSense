import { RecommendationStatus } from '../entities/recommendation.entity';
export declare class UpdateRecommendationDto {
    status?: RecommendationStatus;
    executedByUserId?: number;
}
