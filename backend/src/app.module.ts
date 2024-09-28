import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { OrganizacionModule } from './organizacion/organizacion.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://floorplan_db/nest'),
    UsuarioModule,
    OrganizacionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
