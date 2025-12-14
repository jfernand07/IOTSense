import { User } from '../../users/entities/user.entity';
export declare class RefreshToken {
    id: number;
    user: User;
    tokenHash: string;
    expiresAt: Date;
    isRevoked: boolean;
    createdAt: Date;
}
