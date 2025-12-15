import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Plant } from '../plants/entities/plant.entity';
export declare class DevicesService {
    private readonly deviceRepo;
    private readonly plantRepo;
    constructor(deviceRepo: Repository<Device>, plantRepo: Repository<Plant>);
    create(dto: CreateDeviceDto): Promise<Device>;
    findAll(): Promise<Device[]>;
    findOne(id: number): Promise<Device>;
    update(id: number, dto: UpdateDeviceDto): Promise<Device>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
