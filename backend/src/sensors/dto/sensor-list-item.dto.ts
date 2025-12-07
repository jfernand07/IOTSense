export class SensorListItemDto {
  // Device
  deviceName: string;
  deviceExternalId: string;
  deviceDescription: string | null;
  deviceStatus: string;
  deviceLocation: string | null;

  // SensorType
  sensorTypeDisplayName: string;
  sensorTypeDescription: string | null;

  // Plant (puede ser null)
  plantName: string | null;
  plantLocation: string | null;

  // Sensor
  sensorName: string;
  sensorExternalId: string;
}
