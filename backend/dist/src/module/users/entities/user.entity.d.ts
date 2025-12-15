import { Plant } from '../../plants/entities/plant.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    isActive: boolean;
    refresh_token_hash: string | null;
    acces_token: string | null;
    createdAt: Date;
    updatedAt: Date;
    plants: Plant[];
}
