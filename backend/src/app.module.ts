import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PlanoModule } from './plano/plano.module';
import { JwtStrategy } from './jwt.strategy'; 
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://floorplan_db/nest'),
    UsuarioModule,
    OrganizacionModule,
    ProyectoModule,
    PlanoModule,
    PassportModule, 
    JwtModule.register({
      secret: '7e3K3jKxoghSTlYFnnPeigOLfzGWmfFeztaKX-AhLPbWy-EF2LCIy8JBaI46yqIm',
      signOptions: { 
        expiresIn: '60m' 
      },
     }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard]
})


export class AppModule {}
