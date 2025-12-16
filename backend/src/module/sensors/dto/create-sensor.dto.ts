import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSensorDto {
  @ApiProperty({ example: 3, description: 'ID del dispositivo al que pertenece el sensor' })
  @Type(() => Number)
  @IsInt()
  deviceId: number;

  @ApiProperty({ example: 'humidity', description: 'Tipo de sensor' })
  @IsString()
  @MaxLength(50)
  type: string;

  @ApiProperty({ example: 1, description: 'Unidad de medida (ej: 1 = %, 2 = °C, etc.)' })
  @Type(() => Number)
  @IsInt()
  unit: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
