import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { Plant } from '../plants/entities/plant.entity';

@Injectable()
export class RecommendationsService {
    constructor(
        @InjectRepository(Recommendation)
        private readonly recRepo: Repository<Recommendation>,
        @InjectRepository(Plant)
        private readonly plantRepo: Repository<Plant>,
    ) { }

    async create(dto: CreateRecommendationDto) {
        const plant = await this.plantRepo.findOneBy({ id: dto.plantId });
        if (!plant) throw new Error('Plant not found');

        const rec = this.recRepo.create({
            plant,
            type: dto.type,
            message: dto.message,
            status: dto.status,
        });

        if (dto.alertId) {
            rec.alert = { id: dto.alertId } as any;
        }

        return this.recRepo.save(rec);
    }
}
