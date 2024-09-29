import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum Destino {
  A_CONSTRUIR = 'A CONSTRUIR',
  A_AMPLIAR = 'A AMPLIAR',
  A_REFACCIONAR = 'A REFACCIONAR',
  A_DEMOLER = 'A DEMOLER',
  A_DEMOLER_Y_CONSTRUIR = 'A DEMOLER Y CONSTRUIR',
  A_DOCUMENTAR = 'A DOCUMENTAR'
}

enum Obra {
  Vivienda_unifamiliar = 'Vivienda unifamiliar',
  Vivienda_multifamiliar = 'Vivienda multifamiliar',
  Vivienda_Unifamiliar_Agrupada = 'Vivienda Unifamiliar Agrupada',
  Oficina = 'Oficina',
  Local_comercial = 'Local comercial',
  Industria = 'Industria'
}

@Schema()
export class Proyecto extends Document{
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  nombre: string;

  @Prop({ required: true, minlength: 3 })
  ubicacion: string;

  @Prop({ required: true, enum: Destino })
  destino: Destino;

  @Prop({ required: true, enum: Obra })
  obra: Obra;
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);