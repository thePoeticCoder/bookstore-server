import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareModule } from './middleware/middleware.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CtxIdMiddleware } from './middleware/context.id.middleware';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://thePoeticCoder:root@cluster0.5auypbf.mongodb.net/everything"),
  BooksModule, UserModule, MiddlewareModule, CartModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(userContext: MiddlewareConsumer) {
    userContext
      .apply(CtxIdMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}

