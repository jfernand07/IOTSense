import { Repository } from 'typeorm';
import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { User } from '../users/entities/user.entity';
export declare class PlantsService {
    private readonly plantRepo;
    private readonly userRepo;
    constructor(plantRepo: Repository<Plant>, userRepo: Repository<User>);
    create(dto: CreatePlantDto): Promise<Plant>;
    findAll(): Promise<Plant[]>;
    findOne(id: number): Promise<Plant>;
    update(id: number, dto: UpdatePlantDto): Promise<Plant>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
