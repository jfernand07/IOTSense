import { SensorTypesService } from './sensor-types.service';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';
export declare class SensorTypesController {
    private readonly service;
    constructor(service: SensorTypesService);
    create(dto: CreateSensorTypeDto): Promise<import("./entities/sensor-type.entity").SensorType>;
    findAll(): Promise<import("./entities/sensor-type.entity").SensorType[]>;
}
