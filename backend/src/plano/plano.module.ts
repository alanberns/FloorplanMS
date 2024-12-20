import { Module, forwardRef } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plano, PlanoSchema } from './schemas/plano.schema';
import { ProyectoModule } from '../proyecto/proyecto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plano.name, schema: PlanoSchema }]),
    forwardRef(() =>ProyectoModule),
  ],
  controllers: [PlanoController],
  providers: [PlanoService],
  exports: [PlanoService]
})
export class PlanoModule {}
