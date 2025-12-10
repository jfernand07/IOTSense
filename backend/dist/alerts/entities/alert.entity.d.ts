import { Plant } from '../../plants/entities/plant.entity';
import { Sensor } from '../../sensors/entities/sensor.entity';
import { User } from '../../users/entities/user.entity';
export declare enum AlertSeverity {
    INFO = "INFO",
    WARNING = "WARNING",
    CRITICAL = "CRITICAL"
}
export declare enum AlertStatus {
    OPEN = "OPEN",
    ACKNOWLEDGED = "ACKNOWLEDGED",
    RESOLVED = "RESOLVED"
}
export declare class Alert {
    id: number;
    plant: Plant;
    sensor?: Sensor | null;
    resolvedBy?: User | null;
    type: string;
    severity: AlertSeverity;
    message: string;
    status: AlertStatus;
    createdAt: Date;
    resolvedAt?: Date | null;
}
