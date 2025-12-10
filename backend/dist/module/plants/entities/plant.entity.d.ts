import { PlantType } from '../../plant-types/entities/plant-type.entity';
import { User } from '../../users/entities/user.entity';
export declare class Plant {
    id: number;
    plantType: PlantType;
    owner: User;
    name: string;
    location?: string | null;
    datePlanted?: string | null;
    isActive: boolean;
    notes?: string | null;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
