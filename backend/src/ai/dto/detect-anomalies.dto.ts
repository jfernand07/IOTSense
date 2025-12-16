export class DetectAnomaliesDto {
  // Medidas actuales del sensor
  temp_ambiente: number;
  hum_ambiente: number;
  hum_suelo: number;
  temp_suelo: number;
  timestamp: string;

  // Historial opcional de lecturas previas
  lastValues?: DetectAnomaliesDto[];

  /**
   * Rango ideal de operación de la planta.
   * Puede ser un texto descriptivo o un JSON serializado con umbrales.
   */
  idealRanges?: string;

  /**
   * Identificadores opcionales para asociar la lectura
   * con una planta y/o un sensor concreto.
   */
  plantId?: number;
  sensorId?: number;
}


