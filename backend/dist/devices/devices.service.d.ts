import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
export declare class DevicesService {
    private readonly repo;
    constructor(repo: Repository<Device>);
    findByExternalId(externalId: string): Promise<Device | null>;
    create(dto: CreateDeviceDto): Promise<Device>;
    findAll(): Promise<Device[]>;
}
