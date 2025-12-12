import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
export declare class AlertsController {
    private readonly service;
    constructor(service: AlertsService);
    create(dto: CreateAlertDto): Promise<import("./entities/alert.entity").Alert>;
    findAll(): Promise<import("./dto/alert-list-item.dto").AlertListItemDto[]>;
}
