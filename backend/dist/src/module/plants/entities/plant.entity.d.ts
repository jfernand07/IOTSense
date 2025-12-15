import { User } from '../../users/entities/user.entity';
import { Device } from '../../devices/entities/device.entity';
export declare class Plant {
    id: number;
    name: string;
    species: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
    devices: Device[];
}
