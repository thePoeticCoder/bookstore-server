import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartService } from 'src/cart/cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, orderSchema } from 'src/schema/order.schema';
import { MiddlewareModule } from 'src/middleware/middleware.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config';
import { OrderDao } from './order.dao';
import { CartModule } from 'src/cart/cart.module';

@Module({
    imports: [
    MongooseModule.forFeature([
    { name: Order.name, schema: orderSchema }
    ]),
    MiddlewareModule,
    JwtModule.register({
      secret: AppConfig.JWT_SECRET_KEY,
    }),CartModule,
  ],
  providers: [OrderService,OrderDao],
  controllers: [OrderController]
})
export class OrderModule {}
