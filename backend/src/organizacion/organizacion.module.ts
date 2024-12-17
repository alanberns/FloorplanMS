import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionController } from './organizacion.controller';
import { Organizacion, OrganizacionSchema } from './schemas/organizacion.schema';
import { UsuarioModule } from '../usuario/usuario.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organizacion.name, schema: OrganizacionSchema }]),
    forwardRef(() => UsuarioModule)
],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  exports: [OrganizacionService],
})
export class OrganizacionModule {}
