import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './entities/user.entity';
export declare class UsersService {
    private readonly repo;
    constructor(repo: Repository<User>);
    findByEmail(email: string, includePassword?: boolean): Promise<User | null>;
    findById(id: number, includePassword?: boolean): Promise<User | null>;
    findByIdWithPassword(id: number): Promise<User | null>;
    create(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        plants: import("../plants/entities/plant.entity").Plant[];
    }>;
    findAll(): Promise<User[]>;
}
