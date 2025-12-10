import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
export declare class SensorsController {
    private readonly service;
    constructor(service: SensorsService);
    create(dto: CreateSensorDto): Promise<import("./entities/sensor.entity").Sensor>;
    findAll(): Promise<import("./dto/sensor-list-item.dto").SensorListItemDto[]>;
}
