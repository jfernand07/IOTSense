import { Device } from '../../devices/entities/device.entity';
import { SensorCurrentState } from './sensor-current-state.entity';
export declare class Sensor {
    id: number;
    type: string;
    unit: number;
    isActive: boolean;
    createdAt: Date;
    device: Device;
    currentState: SensorCurrentState;
}
