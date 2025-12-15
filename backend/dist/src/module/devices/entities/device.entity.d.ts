import { Plant } from '../../plants/entities/plant.entity';
import { Sensor } from '../../sensors/entities/sensor.entity';
export declare class Device {
    id: number;
    name: string;
    location: string;
    hasCamera: boolean;
    isActive: boolean;
    createdAt: Date;
    plant: Plant;
    sensors: Sensor[];
}
