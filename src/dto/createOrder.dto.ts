import { ObjectId } from "mongoose";
import { AddressDto } from "./address.dto";

export class CreateOrderDto {
	
	email: String;

	cartId: string

	totalAmount: number;

	date: number;

	address:AddressDto
}

export class ReqCreateOrderDto {

	cartId: ObjectId;

	address:AddressDto
}

