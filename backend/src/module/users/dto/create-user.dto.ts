import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Ana López' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'ana.lopez@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  // El cliente manda password (NO password_hash)
  @ApiProperty({ example: 'Secreta123' })
  @IsString()
  @MinLength(6)
  password: string;

  // opcional: si no llega, se usa default 'user'
  @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsEnum(Boolean)
  isActive?: boolean;
}
