import { Module } from '@nestjs/common';
import { RulesEngineServicesTsService } from './rules-engine.services.ts.service';

@Module({
  providers: [RulesEngineServicesTsService]
})
export class RulesEngineModule {}
