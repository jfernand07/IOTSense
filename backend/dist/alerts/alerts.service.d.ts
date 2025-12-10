import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Plant } from '../plants/entities/plant.entity';
import { Sensor } from '../sensors/entities/sensor.entity';
import { AlertListItemDto } from './dto/alert-list-item.dto';
export declare class AlertsService {
    private readonly alertRepo;
    private readonly plantRepo;
    private readonly sensorRepo;
    constructor(alertRepo: Repository<Alert>, plantRepo: Repository<Plant>, sensorRepo: Repository<Sensor>);
    create(dto: CreateAlertDto): Promise<Alert>;
    findAll(): Promise<AlertListItemDto[]>;
}
