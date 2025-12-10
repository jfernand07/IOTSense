import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { Device } from '../devices/entities/device.entity';
import { SensorType } from '../sensor-types/entities/sensor-type.entity';
import { Plant } from '../plants/entities/plant.entity';
import { SensorListItemDto } from './dto/sensor-list-item.dto';
export declare class SensorsService {
    private readonly sensorRepo;
    private readonly deviceRepo;
    private readonly sensorTypeRepo;
    private readonly plantRepo;
    constructor(sensorRepo: Repository<Sensor>, deviceRepo: Repository<Device>, sensorTypeRepo: Repository<SensorType>, plantRepo: Repository<Plant>);
    findByExternalId(externalId: string): Promise<Sensor | null>;
    create(dto: CreateSensorDto): Promise<Sensor>;
    findAll(): Promise<SensorListItemDto[]>;
}
