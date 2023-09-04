import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from 'src/schema/book.schema';
import { BooksDao } from './books.dao';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: Books.name, schema: BookSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService,BooksDao]
})
export class BooksModule {}
