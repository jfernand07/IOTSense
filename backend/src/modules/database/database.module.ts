import { Module } from '@nestjs/common';
import { DatabaseServicesTsService } from './database.services.ts/database.services.ts.service';

@Module({
  providers: [DatabaseServicesTsService]
})
export class DatabaseModule {}
