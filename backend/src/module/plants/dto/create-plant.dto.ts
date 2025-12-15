import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty({ example: 'Ficus de la oficina' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Ficus benjamina' })
  @IsString()
  @MaxLength(100)
  species: string;

  @ApiProperty({ example: 'Planta ubicada en la ventana principal' })
  @IsString()
  description: string;

  @ApiProperty({
    example: 12,
    description: 'ID del usuario propietario de la planta',
  })
  @Type(() => Number)
  @IsInt()
  ownerUserId: number;
}
