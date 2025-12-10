import { Repository } from 'typeorm';
import { PlantType } from './entities/plant-type.entity';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';
export declare class PlantTypesService {
    private readonly repo;
    constructor(repo: Repository<PlantType>);
    findByName(name: string): Promise<PlantType | null>;
    create(dto: CreatePlantTypeDto): Promise<PlantType[]>;
    findAll(): Promise<PlantType[]>;
}
