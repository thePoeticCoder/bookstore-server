import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MiddlewareModule } from 'src/middleware/middleware.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from 'src/schema/cart.shema';
import { CartDao } from './cart.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: cartSchema }
    ]),
    MiddlewareModule,
    JwtModule.register({
      secret: AppConfig.JWT_SECRET_KEY,
    })
  ],
  controllers: [CartController],
  providers: [CartService, CartDao,],
  exports: [CartService],
})
export class CartModule { }

