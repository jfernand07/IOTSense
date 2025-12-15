import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { Device } from '../devices/entities/device.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsService {
    private readonly sensorRepo;
    private readonly deviceRepo;
    constructor(sensorRepo: Repository<Sensor>, deviceRepo: Repository<Device>);
    create(dto: CreateSensorDto): Promise<Sensor>;
    findAll(): Promise<Sensor[]>;
    findOne(id: number): Promise<Sensor | null>;
    update(id: number, dto: UpdateSensorDto): Promise<Sensor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
