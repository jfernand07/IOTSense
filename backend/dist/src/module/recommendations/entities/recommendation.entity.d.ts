import { Plant } from '../../plants/entities/plant.entity';
import { Alert } from '../../alerts/entities/alert.entity';
import { User } from '../../users/entities/user.entity';
export declare enum RecommendationStatus {
    PENDING = "PENDING",
    APPLIED = "APPLIED",
    DISMISSED = "DISMISSED"
}
export declare class Recommendation {
    id: number;
    plant: Plant;
    alert?: Alert | null;
    executedBy?: User | null;
    type: string;
    message: string;
    status: RecommendationStatus;
    createdAt: Date;
    executedAt?: Date | null;
}
