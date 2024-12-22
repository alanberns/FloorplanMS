import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  userId: MongooseSchema.Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
