import { CreateDeviceDto } from './create-device.dto';
import { DeviceStatus } from '../entities/device.entity';
declare const UpdateDeviceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDeviceDto>>;
export declare class UpdateDeviceDto extends UpdateDeviceDto_base {
    lastSeenAt?: string;
    status?: DeviceStatus;
}
export {};
