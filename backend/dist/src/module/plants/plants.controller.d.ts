import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
export declare class PlantsController {
    private readonly service;
    constructor(service: PlantsService);
    create(dto: CreatePlantDto): Promise<import("./entities/plant.entity").Plant>;
    findAll(): Promise<import("./entities/plant.entity").Plant[]>;
    findOne(id: number): Promise<import("./entities/plant.entity").Plant>;
    update(id: number, dto: UpdatePlantDto): Promise<import("./entities/plant.entity").Plant>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
