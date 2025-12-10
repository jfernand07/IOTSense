import { ReadingQualityFlag } from '../entities/reading.entity';
export declare class CreateReadingDto {
    sensorId: number;
    value: number;
    timestamp: string;
    qualityFlag?: ReadingQualityFlag;
    rawPayload?: Record<string, any>;
}
