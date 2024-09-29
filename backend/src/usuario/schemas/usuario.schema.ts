import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  nombre: string;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  apellido: string;

  @Prop({ required: true, unique: true, match: /.+@.+\..+/  })
  email: string;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  password: string;

  @Prop()
  fechaDeNacimiento: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organizacion' })
  organizacion: MongooseSchema.Types.ObjectId;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
