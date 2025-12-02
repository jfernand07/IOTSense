import { Module } from '@nestjs/common';
import { RolesServicesTsService } from './roles.services.ts.service';

@Module({
  providers: [RolesServicesTsService]
})
export class RolesModule {}
