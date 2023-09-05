import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Address } from './address.shema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {

	_id: ObjectId;

	@Prop()
	email: String;

	@Prop()
	cartId: string

	@Prop()
	totalAmount: number;

	@Prop()
	date: number;

	@Prop()
	address:Address

}

export const orderSchema = SchemaFactory.createForClass(Order);
