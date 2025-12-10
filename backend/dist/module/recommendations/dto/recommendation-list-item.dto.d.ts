import { RecommendationStatus } from '../entities/recommendation.entity';
export declare class RecommendationListItemDto {
    type: string;
    message: string;
    status: RecommendationStatus;
    plantName: string;
    plantLocation: string;
    alertType: string | null;
    alertSeverity: string | null;
}
