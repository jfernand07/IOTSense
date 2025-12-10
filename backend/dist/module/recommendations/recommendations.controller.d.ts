import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
export declare class RecommendationsController {
    private readonly service;
    constructor(service: RecommendationsService);
    create(dto: CreateRecommendationDto): Promise<import("./entities/recommendation.entity").Recommendation>;
    findAll(): Promise<import("./dto/recommendation-list-item.dto").RecommendationListItemDto[]>;
}
