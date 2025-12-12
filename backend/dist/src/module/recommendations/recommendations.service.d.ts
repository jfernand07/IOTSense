import { Repository } from 'typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { Plant } from '../plants/entities/plant.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { RecommendationListItemDto } from './dto/recommendation-list-item.dto';
export declare class RecommendationsService {
    private readonly repo;
    private readonly plantRepo;
    private readonly alertRepo;
    constructor(repo: Repository<Recommendation>, plantRepo: Repository<Plant>, alertRepo: Repository<Alert>);
    create(dto: CreateRecommendationDto): Promise<Recommendation>;
    findAll(): Promise<RecommendationListItemDto[]>;
}
