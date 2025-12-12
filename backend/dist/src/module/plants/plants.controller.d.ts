import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
export declare class PlantsController {
    private readonly service;
    constructor(service: PlantsService);
    create(dto: CreatePlantDto): Promise<import("./entities/plant.entity").Plant>;
    findAll(): Promise<import("./dto/plant-list-item.dto").PlantListItemDto[]>;
}
