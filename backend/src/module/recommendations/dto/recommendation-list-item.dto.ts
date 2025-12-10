import { RecommendationStatus } from '../entities/recommendation.entity';

export class RecommendationListItemDto {
  type: string;
  message: string;
  status: RecommendationStatus;
  plantName: string;
  plantLocation: string;
  alertType: string | null;
  alertSeverity: string | null;
}
