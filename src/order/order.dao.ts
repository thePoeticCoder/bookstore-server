import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, } from 'mongoose';
import { Order, OrderDocument } from 'src/schema/order.schema';

@Injectable()
export class OrderDao {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async create(orderData: any,) {
	console.log("I am creating an Order");
    const createdOrder =   new this.orderModel({
      ...orderData,
  
    });
    return await createdOrder.save();
  }

}






