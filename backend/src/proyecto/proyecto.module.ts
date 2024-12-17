import { Module, forwardRef } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from './schemas/proyecto.schema';
import { OrganizacionModule } from '../organizacion/organizacion.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proyecto.name, schema: ProyectoSchema }]),
    forwardRef(() =>OrganizacionModule)
  ],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectoModule {}
