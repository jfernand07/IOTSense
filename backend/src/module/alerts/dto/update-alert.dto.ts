import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { AlertStatus } from '../entities/alert.entity';

export class UpdateAlertDto {
  @IsOptional()
  @IsEnum(AlertStatus)
  status?: AlertStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  resolvedByUserId?: number;
}
