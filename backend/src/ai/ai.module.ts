import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import { AlertsModule } from '../module/alerts/alerts.module';
import { RecommendationsModule } from '../module/recommendations/recommendations.module';

@Module({
  imports: [ConfigModule, AlertsModule, RecommendationsModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}

