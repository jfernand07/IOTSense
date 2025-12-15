import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    create(dto: CreateDeviceDto): Promise<import("./entities/device.entity").Device>;
    findAll(): Promise<import("./entities/device.entity").Device[]>;
    findOne(id: number): Promise<import("./entities/device.entity").Device>;
    update(id: number, dto: UpdateDeviceDto): Promise<import("./entities/device.entity").Device>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
