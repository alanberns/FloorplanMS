import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Organizacion extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  direccion: string;

  @Prop()
  telefono: string;

  @Prop()
  email: string;
}

export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion);
