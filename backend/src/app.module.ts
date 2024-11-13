import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PlanoModule } from './plano/plano.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://floorplan_db/nest'),
    UsuarioModule,
    OrganizacionModule,
    ProyectoModule,
    PlanoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
