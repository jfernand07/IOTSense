import { Module } from '@nestjs/common';
import { RecommendationsControllerTsController } from './recommendations.controller.ts.controller';
import { RecommendationsSrvicesTsService } from './recommendations.srvices.ts.service';

@Module({
  controllers: [RecommendationsControllerTsController],
  providers: [RecommendationsSrvicesTsService]
})
export class RecomendationsModule {}
