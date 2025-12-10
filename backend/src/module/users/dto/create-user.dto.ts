import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  // El cliente manda password (NO password_hash)
  @IsString()
  @MinLength(6)
  password: string;

  // opcional: si no llega, se usa default 'user'
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
