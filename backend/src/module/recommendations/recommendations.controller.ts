import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

@Controller('recommendations')
export class RecommendationsController {
    constructor(private readonly recService: RecommendationsService) { }

    @Post()
    create(@Body() dto: CreateRecommendationDto) {
        return this.recService.create(dto);
    }
}
