import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dto/create-reading.dto';
export declare class ReadingsController {
    private readonly service;
    constructor(service: ReadingsService);
    create(dto: CreateReadingDto): Promise<import("./entities/reading.entity").Reading>;
    findAll(): Promise<import("./entities/reading.entity").Reading[]>;
}
