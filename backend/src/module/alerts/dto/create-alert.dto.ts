import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { AlertSeverity } from '../entities/alert.entity';

export class CreateAlertDto {
    @Type(() => Number)
    @IsInt()
    plantId: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    sensorId?: number;

    @IsString()
    @MaxLength(50)
    type: string;

    @IsEnum(AlertSeverity)
    severity: AlertSeverity;

    @IsString()
    message: string;
}
