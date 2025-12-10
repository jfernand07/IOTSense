import { AlertSeverity } from '../entities/alert.entity';
export declare class CreateAlertDto {
    plantId: number;
    sensorId?: number;
    type: string;
    severity: AlertSeverity;
    message: string;
}
