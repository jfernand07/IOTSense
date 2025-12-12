import { Device } from '../../devices/entities/device.entity';
import { SensorType } from '../../sensor-types/entities/sensor-type.entity';
import { Plant } from '../../plants/entities/plant.entity';
export declare class Sensor {
    id: number;
    device: Device;
    sensorType: SensorType;
    plant?: Plant | null;
    name: string;
    externalId: string;
    pin?: string | null;
    calibrationOffset: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
