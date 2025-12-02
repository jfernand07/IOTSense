import { Module } from '@nestjs/common';
import { AuthServicesTsService } from './auth.services.ts.service';
import { AuthControllerTsController } from './auth.controller.ts.controller';

@Module({
  providers: [AuthServicesTsService],
  controllers: [AuthControllerTsController]
})
export class AuthModule {}
