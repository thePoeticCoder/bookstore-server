import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Cart, cartDocument } from 'src/schema/cart.shema';
import { CartDto } from 'src/dto/cart.dto';

@Injectable()
export class CartDao {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<cartDocument>,
  ) {}

  async findOne(_id: ObjectId) {
    console.log("cart id se find karo");
    const cartData = await this.cartModel.findById(_id);
    console.log(cartData.totalAmount,"in daooooooooooooooooooooo")
    if (!cartData) {
      throw new NotFoundException();
    }
    return cartData;
  }

  create(cartData: CartDto,) {
	console.log("I am creating an Cart");
    const createdCart = new this.cartModel({
      ...cartData,
      
    });
    return createdCart.save();
  }

  async delete(_id: ObjectId) {
    console.log(_id,"indao");
     const results = await this.cartModel.findOneAndDelete(_id);
     if(results){
      return "SuccesFully Deleted"
     }else {
      throw new NotFoundException();
     }
  }
}






