
import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CartDao } from './cart.dao';
import { CartDto } from 'src/dto/cart.dto';



@Injectable()
export class CartService {

constructor(private readonly cartDao: CartDao) { };


  async findCartById(id: ObjectId) {
    console.log("cart service");

    return this.cartDao.findOne(id);
  }

  async createCart(cartData: CartDto,) {
    return this.cartDao.create(cartData);
  }

  async deleteCart(cartId: ObjectId) {
    return this.cartDao.delete(cartId);
  }
}






