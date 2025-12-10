import { Repository } from 'typeorm';
import { SensorType } from './entities/sensor-type.entity';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';
export declare class SensorTypesService {
    private readonly repo;
    constructor(repo: Repository<SensorType>);
    findByCode(code: string): Promise<SensorType | null>;
    create(dto: CreateSensorTypeDto): Promise<SensorType>;
    findAll(): Promise<SensorType[]>;
}
