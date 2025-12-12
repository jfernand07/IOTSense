import { DeviceStatus } from '../entities/device.entity';
export declare class CreateDeviceDto {
    name: string;
    externalId: string;
    description?: string;
    status?: DeviceStatus;
    location?: string;
}
