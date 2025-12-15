import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ana López' })
  name: string;

  @ApiProperty({ example: 'ana.lopez@example.com' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  role: UserRole;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-10T15:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-02-01T12:30:00.000Z' })
  updatedAt: Date;
}
