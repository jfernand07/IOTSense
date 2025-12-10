import { PlantTypesService } from './plant-types.service';
import { CreatePlantTypeDto } from './dto/create-plant-type.dto';
export declare class PlantTypesController {
    private readonly service;
    constructor(service: PlantTypesService);
    create(dto: CreatePlantTypeDto): Promise<import("./entities/plant-type.entity").PlantType[]>;
    findAll(): Promise<import("./entities/plant-type.entity").PlantType[]>;
}
