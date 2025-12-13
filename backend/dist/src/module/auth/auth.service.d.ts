import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private refreshTokenRepo;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, refreshTokenRepo: Repository<RefreshToken>);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    revokeToken(refreshToken: string): Promise<void>;
    private generateTokens;
    private hashToken;
}
