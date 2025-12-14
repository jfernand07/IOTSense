import { UserRole } from '../../users/entities/user.entity';

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
}

