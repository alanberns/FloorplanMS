import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum Especialidad {
  Arquitectura = 'Arquitectura',
  Estructura =  'Estructura',
  Instalaciones_electricas = 'Instalaciones eléctricas',
  Instalacion_sanitaria = 'Instalación sanitaria',
  Otros = 'Otros'
}

@Schema()
export class Plano extends Document {

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  nombre: string;

  @Prop({ required: true, enum: Especialidad })
  especialidad: string;

  @Prop({ type: [String] })
  etiquetas?: string[];

  @Prop({ required: true, type: Buffer })
  archivo: Buffer;

  @Prop({ type: String, required: true})
  nombreArchivo: String

  @Prop({ type: String })
  usuarioMail: String

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Proyecto' })
  proyecto: MongooseSchema.Types.ObjectId;
}

export const PlanoSchema = SchemaFactory.createForClass(Plano);
