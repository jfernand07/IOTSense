import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("./dto/auth-response.dto").AuthResponseDto>;
    login(dto: LoginDto): Promise<import("./dto/auth-response.dto").AuthResponseDto>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
    logout(dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
}
