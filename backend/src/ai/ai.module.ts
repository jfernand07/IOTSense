import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [ConfigModule, MongodbModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
