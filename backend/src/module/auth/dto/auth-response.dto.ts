import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Ana López',
      email: 'ana.lopez@example.com',
      role: UserRole.ADMIN,
    },
  })
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
}
