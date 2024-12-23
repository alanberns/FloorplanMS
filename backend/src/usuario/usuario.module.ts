import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario, UsuarioSchema } from './schemas/usuario.schema';
import { OrganizacionModule } from 'src/organizacion/organizacion.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    forwardRef(() => OrganizacionModule),
    AdminModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [MongooseModule, UsuarioService]
})
export class UsuarioModule {}
