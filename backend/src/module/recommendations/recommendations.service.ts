import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Recommendation, RecommendationStatus } from './entities/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { Plant } from '../plants/entities/plant.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { RecommendationListItemDto } from './dto/recommendation-list-item.dto';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation) private readonly repo: Repository<Recommendation>,
    @InjectRepository(Plant) private readonly plantRepo: Repository<Plant>,
    @InjectRepository(Alert) private readonly alertRepo: Repository<Alert>,
  ) {}

  async create(dto: CreateRecommendationDto) {
    const plant = await this.plantRepo.findOne({ where: { id: dto.plantId } });
    if (!plant) throw new NotFoundException('Plant no existe.');

    let alert: Alert | null = null;
    if (dto.alertId) {
      alert = await this.alertRepo.findOne({ where: { id: dto.alertId } });
      if (!alert) throw new NotFoundException('Alert no existe.');
    }

    const reco = this.repo.create({
      plant,
      alert,
      type: dto.type,
      message: dto.message,
      status: dto.status ?? RecommendationStatus.PENDING,
      executedAt: null,
      executedBy: null,
    });

    return this.repo.save(reco);
  }

  async findAll(): Promise<RecommendationListItemDto[]> {
    return this.repo
      .createQueryBuilder('r')
      .innerJoin('r.plant', 'p')
      .leftJoin('r.alert', 'a')
      .select([
        'r.type AS "type"',
        'r.message AS "message"',
        'r.status AS "status"',

        'p.name AS "plantName"',
        'p.location AS "plantLocation"',

        'a.type AS "alertType"',
        'a.severity AS "alertSeverity"',
      ])
      .orderBy('r.id', 'DESC')
      .getRawMany<RecommendationListItemDto>();
  }
}
