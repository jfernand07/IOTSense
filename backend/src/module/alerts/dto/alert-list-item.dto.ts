export class AlertListItemDto {
  type: string;
  severity: string;
  message: string;
  status: string;

  plantName: string;
  plantLocation: string | null;

  sensorName: string | null;
  sensorExternalId: string | null;
}
