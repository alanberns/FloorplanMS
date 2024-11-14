import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum Obra {
  A_CONSTRUIR = 'A CONSTRUIR',
  A_AMPLIAR = 'A AMPLIAR',
  A_REFACCIONAR = 'A REFACCIONAR',
  A_DEMOLER = 'A DEMOLER',
  A_DEMOLER_Y_CONSTRUIR = 'A DEMOLER Y CONSTRUIR',
  A_DOCUMENTAR = 'A DOCUMENTAR'
}

enum Destino {
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

  @Prop({ required: true, minlength: 3, maxlength: 50 })
  expediente: string;

  @Prop({ required: true, minlength: 3 })
  ubicacion: string;

  @Prop({ required: true, enum: Destino })
  destino: Destino;

  @Prop({ required: true, enum: Obra })
  obra: Obra;

  @Prop({ required: true, minlength: 1, maxlength: 10 })
  escala: string;
  
  @Prop({ maxlength: 255 })
  otrasExigencias?: string;

  @Prop({ maxlength: 100 })
  antecedentes?: string;

  @Prop({ tmaxlength: 255 })
  propietario?: string;

  @Prop({ maxlength: 150 })
  proyectistas?: string;

  @Prop({ maxlength: 150 })
  direccionTecnica?: string;

  @Prop({ default: false })
  aprobado: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organizacion' })
  organizacion: MongooseSchema.Types.ObjectId;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Plano' }])
  planos: MongooseSchema.Types.ObjectId[];
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);