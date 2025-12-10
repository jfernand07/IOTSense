import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { DeviceStatus } from '../entities/device.entity';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @IsOptional()
  @IsDateString()
  lastSeenAt?: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;
}
