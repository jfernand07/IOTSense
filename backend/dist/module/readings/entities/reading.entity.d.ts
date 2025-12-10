import { Sensor } from '../../sensors/entities/sensor.entity';
export declare enum ReadingQualityFlag {
    OK = "OK",
    SUSPECT = "SUSPECT",
    ERROR = "ERROR"
}
export declare class Reading {
    id: string;
    sensor: Sensor;
    value: string;
    timestamp: Date;
    qualityFlag: ReadingQualityFlag;
    rawPayload?: Record<string, any> | null;
    createdAt: Date;
}
