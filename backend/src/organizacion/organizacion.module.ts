import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionController } from './organizacion.controller';
import { Organizacion, OrganizacionSchema } from './schemas/organizacion.schema';
import { UsuarioModule } from '../usuario/usuario.module'; 
import { ProyectoModule } from '../proyecto/proyecto.module'; 
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organizacion.name, schema: OrganizacionSchema }]),
    forwardRef(() => UsuarioModule),
    forwardRef(() =>ProyectoModule),forwardRef(() =>AdminModule),
    JwtModule.register({
      secret: '7e3K3jKxoghSTlYFnnPeigOLfzGWmfFeztaKX-AhLPbWy-EF2LCIy8JBaI46yqIm',
      signOptions: { 
        expiresIn: '60m' 
      },
    }),
  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  exports: [OrganizacionService],
})
export class OrganizacionModule {}
