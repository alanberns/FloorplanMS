import { Module, forwardRef } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from './schemas/proyecto.schema';
import { OrganizacionModule } from '../organizacion/organizacion.module';
import { PlanoModule } from 'src/plano/plano.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proyecto.name, schema: ProyectoSchema }]),
    forwardRef(() =>OrganizacionModule),
    forwardRef(() =>PlanoModule),
    forwardRef(() =>UsuarioModule),
    forwardRef(() =>AdminModule),
    JwtModule.register({
      secret: '7e3K3jKxoghSTlYFnnPeigOLfzGWmfFeztaKX-AhLPbWy-EF2LCIy8JBaI46yqIm',
      signOptions: { 
        expiresIn: '60m' 
      },
     }),],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectoModule {}
