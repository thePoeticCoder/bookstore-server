import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ReqCreateOrderDto } from 'src/dto/createOrder.dto';
import { Order } from 'src/schema/order.schema';
import MongooseClassSerializerInterceptor from 'src/utils/MongooseClassSerializer';
import { OrderService } from './order.service';

@Controller('order')
@UseInterceptors(MongooseClassSerializerInterceptor(Order))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


	  @Post('createOrder')
  async createOrder(
    @Body() data:ReqCreateOrderDto,
  ) {
    console.log("controller create order start");
    return this.orderService.createOrder(data);
  }
}
