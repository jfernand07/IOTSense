import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PlantasModule } from './plantas/plantas.module';
import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UsuariosModule, PlantasModule, ConfigModule, CommonModule, ModulesModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
