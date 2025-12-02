import { Module } from '@nestjs/common';
import { CoController } from './co.controller';
import { UserServicesTsService } from './user.services.ts/user.services.ts.service';

@Module({
  controllers: [CoController],
  providers: [UserServicesTsService]
})
export class UsersModule {}
