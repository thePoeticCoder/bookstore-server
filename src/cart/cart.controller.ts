import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import ParamsWithId from '../utils/validator.paramWithId';
import MongooseClassSerializerInterceptor from '../utils/MongooseClassSerializer';
import { JwtVerification } from 'src/middleware/jwtAuth.middleware';
import { Cart } from 'src/schema/cart.shema';
import { CartDto } from 'src/dto/cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
@UseInterceptors(MongooseClassSerializerInterceptor(Cart))
export class CartController {
  constructor(private readonly cartService: CartService) {}
  //wrap up the all response in apiresponse interface with proper code
  @JwtVerification()
  @Get('/getById')
  async getCart(@Query() { id }: ParamsWithId) {
    return this.cartService.findCartById(id);
  }
  @JwtVerification()
  @Post('addToCart')
  async createCart(@Body() cartData: CartDto) {
    //change get the book id only in the request and than fetch the book data
    return this.cartService.createCart(cartData);
  }
  @JwtVerification()
  @Delete('deleteCartById')
  async(@Query() { id }: ParamsWithId) {
    console.log(id, 'incoming id');
    return this.cartService.deleteCart(id);
  }
}
