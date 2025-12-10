import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
import { Sensor } from '../sensors/entities/sensor.entity';
export declare class ReadingsService {
    private readonly repo;
    private readonly sensorRepo;
    constructor(repo: Repository<Reading>, sensorRepo: Repository<Sensor>);
    create(dto: CreateReadingDto): Promise<Reading>;
    findAll(): Promise<Reading[]>;
}
