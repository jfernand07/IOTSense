import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsController {
    private readonly sensorsService;
    constructor(sensorsService: SensorsService);
    create(dto: CreateSensorDto): Promise<import("./entities/sensor.entity").Sensor>;
    findAll(): Promise<import("./entities/sensor.entity").Sensor[]>;
    findOne(id: number): Promise<import("./entities/sensor.entity").Sensor>;
    update(id: number, dto: UpdateSensorDto): Promise<import("./entities/sensor.entity").Sensor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
