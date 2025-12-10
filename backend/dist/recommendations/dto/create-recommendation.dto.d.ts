import { RecommendationStatus } from '../entities/recommendation.entity';
export declare class CreateRecommendationDto {
    plantId: number;
    alertId?: number;
    type: string;
    message: string;
    status?: RecommendationStatus;
}
