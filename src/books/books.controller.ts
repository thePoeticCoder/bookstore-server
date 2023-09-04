
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from 'src/schema/book.schema';
import ParamsWithId from '../utils/validator.paramWithId';
import { BooksDto } from '../dto/book.dto';
import MongooseClassSerializerInterceptor from '../utils/MongooseClassSerializer';

@Controller('books')
@UseInterceptors(MongooseClassSerializerInterceptor(Books))
export class BooksController {
constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.findAllBooks();
  }

  @Get(':id')
  async getBook(@Param() { id }: ParamsWithId) {
  	return this.booksService.findBookById(id);
  }

@Post('createBook')
  async createBook(
    @Body() bookData: BooksDto,
    
  ) {
    return this.booksService.createBook(bookData);
  }

    @Put('updateBookById')
  async updateBook(
    @Param() { id }: ParamsWithId,
    @Body() bookData: BooksDto,
  ) {
    return this.booksService.updateBook(id, bookData);
  }

@Delete('deleteBookById')
  async deleteBook(@Param() { id }: ParamsWithId) {
    return this.booksService.deleteBook(id);
  }
}


