
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CartDao } from './cart.dao';
import { CartDto } from 'src/dto/cart.dto';

@Injectable()
export class CartService {

  constructor(private readonly cartDao: CartDao) { }

  async findCartById(id: ObjectId) {

    return this.cartDao.findOne(id);
  }

  createCart(cartData: CartDto,) {
    return this.cartDao.create(cartData);
  }

  async deleteCart(cartId: ObjectId) {
    return this.cartDao.delete(cartId);
  }
}






