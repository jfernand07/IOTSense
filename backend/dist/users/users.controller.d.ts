import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("./entities/user.entity").UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        plants: import("../plants/entities/plant.entity").Plant[];
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
}
