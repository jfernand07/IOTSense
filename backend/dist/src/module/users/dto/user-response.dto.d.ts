import { UserRole } from '../entities/user.entity';
export declare class UserResponseDto {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
