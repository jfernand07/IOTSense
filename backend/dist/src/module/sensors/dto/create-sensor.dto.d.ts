export declare class CreateSensorDto {
    deviceId: number;
    sensorTypeId: number;
    plantId?: number;
    name: string;
    externalId: string;
    pin?: string;
    calibrationOffset?: number;
    isActive?: boolean;
}
