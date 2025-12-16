import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Si permites cambiar password, mantenlo opcional
  @ApiPropertyOptional({ example: 'NuevaClave456' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
