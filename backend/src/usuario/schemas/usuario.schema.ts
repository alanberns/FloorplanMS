import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fechaDeNacimiento: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organizacion' })
  organizacion: MongooseSchema.Types.ObjectId;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
