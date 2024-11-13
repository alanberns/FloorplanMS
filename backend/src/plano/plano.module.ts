import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plano, PlanoSchema } from './schemas/plano.schema';
import { ProyectoModule } from '../proyecto/proyecto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plano.name, schema: PlanoSchema }]),
    ProyectoModule,
  ],
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule {}
