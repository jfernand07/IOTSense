import { ApiProperty } from '@nestjs/swagger';

export class SensorResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  unit: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: () => Date })
  createdAt: Date;

  // puedes agregar relaciones opcionalmente
  @ApiProperty({ type: () => Number })
  deviceId: number;
}
