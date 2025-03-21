import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  phoneNo: number;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  skills: string;

  @Prop()
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
