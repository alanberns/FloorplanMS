import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Organizacion extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  nombre: string;

  @Prop({ required: true, minlength: 3, maxlength: 300 })
  direccion: string;

  @Prop({ required: true, minlength: 3, maxlength: 300 })
  contacto: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Usuario' }])
  usuarios: MongooseSchema.Types.ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Proyecto' }])
  proyectos: MongooseSchema.Types.ObjectId[];
}

export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion);