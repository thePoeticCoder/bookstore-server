import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type BookDocument = HydratedDocument<Books>;

@Schema()
export class Books {
@Transform(({ value }) => value.toString())
  _id: ObjectId;	

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  genre: string;

  @Prop()
  price: number;

  @Prop()
  availability: boolean;

  @Prop()
  language: string;
}

export const BookSchema = SchemaFactory.createForClass(Books);
