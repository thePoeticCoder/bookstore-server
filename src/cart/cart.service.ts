
import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CartDao } from './cart.dao';
import { CartDto } from 'src/dto/cart.dto';
import { CreateOrderDto, ReqCreateOrderDto } from 'src/dto/createOrder.dto';
import { OrderDao } from './order.dao';

@Injectable()
export class CartService {

  constructor(private readonly cartDao: CartDao) { };

  @Inject()
  private orderDao: OrderDao;


  async findCartById(id: ObjectId) {

    return this.cartDao.findOne(id);
  }

  async createCart(cartData: CartDto,) {
    return this.cartDao.create(cartData);
  }

  async createOrder(data: ReqCreateOrderDto,) {
    console.log("service create order");
    try {
      const cartData = await this.cartDao.findOne(data.cartId);

      const { addedBooks } = cartData;

      console.log(cartData.totalAmount);

      //throw error if no vcart data found
      if (!cartData) {
        throw Error("cart is not found");
      }

      var totalAmountCal = 0;
      addedBooks.forEach((book) => {
        totalAmountCal += book.price;
      })
      const payload: CreateOrderDto = {
        email: cartData.email,
        cartId: data.cartId.toString(),
        totalAmount: totalAmountCal,
        date: Date.now(),
        address: data.address //bcz address can be different every time
      }

      // const result = await this.orderDao.create(payload);
      // await this.cartDao.delete(data.cartId);

      // return {
      //  result,
      //   msg: "SuccessFully Created"
      // }


    } catch (e) {
      throw Error(e.msg);
    }
  }

  async deleteCart(cartId: ObjectId) {
    return this.cartDao.delete(cartId);
  }
}






