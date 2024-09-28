import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionController } from './organizacion.controller';
import { Organizacion, OrganizacionSchema } from './schemas/organizacion.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Organizacion.name, schema: OrganizacionSchema }])],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  exports: [OrganizacionService],
})
export class OrganizacionModule {}
