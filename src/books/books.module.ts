import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from 'src/schema/book.schema';
import { BooksDao } from './books.dao';
import { MiddlewareModule } from 'src/middleware/middleware.module';
import { JwtAuthGuard } from 'src/middleware/jwtAuth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: Books.name, schema: BookSchema },
    ]),
  MiddlewareModule,
  JwtModule.register({
    secret: AppConfig.JWT_SECRET_KEY,
  })
  ],
  controllers: [BooksController],
  providers: [BooksService,BooksDao,]
})
export class BooksModule {}
