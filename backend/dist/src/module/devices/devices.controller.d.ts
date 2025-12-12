import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    create(dto: CreateDeviceDto): Promise<import("./entities/device.entity").Device>;
    findAll(): Promise<import("./entities/device.entity").Device[]>;
}
