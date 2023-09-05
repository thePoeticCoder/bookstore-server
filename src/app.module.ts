import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareModule } from './middleware/middleware.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://thePoeticCoder:root@cluster0.5auypbf.mongodb.net/everything"),
  BooksModule, UserModule, MiddlewareModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
