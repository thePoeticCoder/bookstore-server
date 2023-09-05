import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { Books } from './book.schema';

export type cartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
@Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  email :String;

  @Prop()
  addedBooks :Books[];

  @Prop()
  totalAmount: number;

  @Prop()
  date: number;

}

export const cartSchema = SchemaFactory.createForClass(Cart);
