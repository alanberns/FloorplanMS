import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

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

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Usuario' }])
  usuarios: MongooseSchema.Types.ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Proyecto' }])
  proyectos: MongooseSchema.Types.ObjectId[];
}

export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion);
