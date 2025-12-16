import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reading, ReadingSchema } from './schemas/reading.schema';
import { Log, LogSchema } from './schemas/log.schema';
import { Recommendation, RecommendationSchema } from './schemas/recommendation.schema';
import { Alert, AlertSchema } from './schemas/alert.schema';
import { Media, MediaSchema } from './schemas/media.schema';
import { ReadingsService } from './services/readings.service';
import { LogsService } from './services/logs.service';
import { RecommendationsService } from './services/recommendations.service';
import { AlertsService } from './services/alerts.service';
import { MediaService } from './services/media.service';
import { ReadingsController } from './controllers/readings.controller';
import { LogsController } from './controllers/logs.controller';
import { RecommendationsController } from './controllers/recommendations.controller';
import { AlertsController } from './controllers/alerts.controller';
import { MediaController } from './controllers/media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reading.name, schema: ReadingSchema },
      { name: Log.name, schema: LogSchema },
      { name: Recommendation.name, schema: RecommendationSchema },
      { name: Alert.name, schema: AlertSchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  providers: [
    ReadingsService,
    LogsService,
    RecommendationsService,
    AlertsService,
    MediaService,
  ],
  controllers: [
    ReadingsController,
    LogsController,
    RecommendationsController,
    AlertsController,
    MediaController,
  ],
  exports: [
    ReadingsService,
    LogsService,
    RecommendationsService,
    AlertsService,
    MediaService,
  ],
})
export class MongodbModule {}

