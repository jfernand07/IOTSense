import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeviceDto {
  @ApiProperty({ example: 'Dispositivo A1' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Estante superior' })
  @IsString()
  @MaxLength(255)
  location: string;

  @ApiProperty({ example: 5, description: 'ID de la planta asociada' })
  @Type(() => Number)
  @IsInt()
  plantId: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  hasCamera?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
