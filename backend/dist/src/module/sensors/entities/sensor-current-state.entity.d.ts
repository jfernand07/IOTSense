import { Sensor } from './sensor.entity';
export declare class SensorCurrentState {
    sensor_id: number;
    last_value: number;
    last_read_at: Date;
    status: string;
    sensor: Sensor;
}
