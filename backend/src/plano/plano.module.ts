import { Module, forwardRef } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plano, PlanoSchema } from './schemas/plano.schema';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { AdminAuthGuard } from 'src/admin/admin-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plano.name, schema: PlanoSchema }]),
    forwardRef(() =>ProyectoModule),
    forwardRef(() =>UsuarioModule),
    forwardRef(() =>AdminModule),
    JwtModule.register({
      secret: '7e3K3jKxoghSTlYFnnPeigOLfzGWmfFeztaKX-AhLPbWy-EF2LCIy8JBaI46yqIm',
      signOptions: { 
        expiresIn: '60m' 
      },
     }),],
  controllers: [PlanoController],
  providers: [PlanoService, AdminAuthGuard],
  exports: [PlanoModule]
})
export class PlanoModule {}
