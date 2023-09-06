import { Inject, Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { CreateOrderDto, ReqCreateOrderDto } from 'src/dto/createOrder.dto';
import { OrderDao } from './order.dao';

@Injectable()
export class OrderService {

	constructor(private readonly orderDao: OrderDao) { };

  @Inject(CartService)
  private readonly cartService: CartService;

	async createOrder(data: ReqCreateOrderDto,) {
    console.log("service create order");
    try {
      const cartData = await this.cartService.findCartById(data.cartId);

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
      const result = await this.orderDao.create(payload);
      await this.cartService.deleteCart(data.cartId);

      return {
       result,
        msg: "SuccessFully Created"
      }


    } catch (e) {
      throw Error(e.msg);
    }
  }
}
