import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Plant } from '../plants/entities/plant.entity';

@Injectable()
export class AlertsService {
    constructor(
        @InjectRepository(Alert)
        private readonly alertRepo: Repository<Alert>,
        @InjectRepository(Plant)
        private readonly plantRepo: Repository<Plant>,
    ) { }

    async create(dto: CreateAlertDto) {
        const plant = await this.plantRepo.findOneBy({ id: dto.plantId });
        if (!plant) throw new Error('Plant not found');

        const alert = this.alertRepo.create({
            plant,
            type: dto.type,
            severity: dto.severity,
            message: dto.message,
        });

        // If sensorId is implemented, invoke it, but keeping it simple to match DTO
        // We would need Sensor repo to fetch sensor if we want to link it strictly,
        // or relying on TypeORM to handle partial object with ID if configured.
        // For now, let's assume loose linking or ignore sensorId if complex.
        // Actually, AiService passes sensorId but Alert entity has it.
        // Let's rely on TypeORM doing { id: sensorId } for relation if we set it:
        if (dto.sensorId) {
            alert.sensor = { id: dto.sensorId } as any;
        }

        return this.alertRepo.save(alert);
    }
}
