import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { DeviceStatus } from '../entities/device.entity';

export class CreateDeviceDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(200)
  externalId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;
}
