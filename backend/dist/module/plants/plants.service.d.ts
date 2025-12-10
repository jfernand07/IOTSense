import { Repository } from 'typeorm';
import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { User } from '../users/entities/user.entity';
import { PlantType } from '../plant-types/entities/plant-type.entity';
import { PlantListItemDto } from './dto/plant-list-item.dto';
export declare class PlantsService {
    private readonly plantRepo;
    private readonly userRepo;
    private readonly plantTypeRepo;
    constructor(plantRepo: Repository<Plant>, userRepo: Repository<User>, plantTypeRepo: Repository<PlantType>);
    create(dto: CreatePlantDto): Promise<Plant>;
    findAll(): Promise<PlantListItemDto[]>;
}
