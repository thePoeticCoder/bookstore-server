
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import ParamsWithId from '../utils/validator.paramWithId';
import MongooseClassSerializerInterceptor from '../utils/MongooseClassSerializer';
import {  JwtVerification } from 'src/middleware/jwtAuth.middleware';
import { Cart } from 'src/schema/cart.shema';
import { CartDto } from 'src/dto/cart.dto';
import { CartService } from './cart.service';
import { Order } from 'src/schema/order.schema';
import { ObjectId } from 'mongoose';
import { ReqCreateOrderDto } from 'src/dto/createOrder.dto';

@Controller('cart')

@UseInterceptors(MongooseClassSerializerInterceptor(Cart))
export class CartController {
constructor(private readonly cartService: CartService) {}

// @JwtVerification()
  @Get(':id')
  async getCart(@Param() { id }: ParamsWithId) {
  	return this.cartService.findCartById(id);
  }
// @JwtVerification()
@Post('addToCart')
  async createCart(
    @Body() cartData:CartDto,
    
  ) {
    return this.cartService.createCart(cartData);
  }
@Delete('deleteCartById')
  async (@Query() { id }: ParamsWithId) {
    console.log(id,"incoming id");
    return this.cartService.deleteCart(id);
  }
}


