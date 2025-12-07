export class RecommendationListItemDto {
  type: string;
  message: string;
  status: string;

  plantName: string;
  plantLocation: string | null;

  alertType: string | null;
  alertSeverity: string | null;
}
