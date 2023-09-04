
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
  async getCategory(@Param() { id }: ParamsWithId) {
  	return this.booksService.findBookById(id);
  }

@Post('createBook')
  async createCategory(
    @Body() bookData: BooksDto,
    
  ) {
    return this.booksService.createBook(bookData);
  }

    @Put(':id')
  async updateBook(
    @Param() { id }: ParamsWithId,
    @Body() bookData: BooksDto,
  ) {
    return this.booksService.updateBook(id, bookData);
  }

@Delete(':id')
  async deleteBook(@Param() { id }: ParamsWithId) {
    return this.booksService.deleteBook(id);
  }
}


