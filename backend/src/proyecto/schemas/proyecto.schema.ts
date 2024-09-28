import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Proyecto extends Document{
    @Prop({ required: true })
  nombre: string;
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);