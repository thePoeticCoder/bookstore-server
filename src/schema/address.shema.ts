import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type AddressDocument=  HydratedDocument<Address>;;

@Schema()
export class Address {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  city: string;

  @Prop()
  street: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
