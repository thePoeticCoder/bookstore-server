
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
// import CategoriesService from './categories.service';
// import ParamsWithId from '../utils/paramsWithId';
// import CategoryDto from './dto/category.dto';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// import RequestWithUser from '../authentication/requestWithUser.interface';
// import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
// import { Category } from './category.schema';
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
    return this.booksService.findAll();
  }

  @Get(':id')
  async getCategory(@Param() { id }: ParamsWithId) {
  	return this.booksService.findOne(id);
  }

	@Post('createBook')
//   @UseGuards(JwtAuthenticationGuard)
  async createCategory(
    @Body() bookData: BooksDto,
    
  ) {
    return this.booksService.create(bookData);
  }

    @Put(':id')
  async updateBook(
    @Param() { id }: ParamsWithId,
    @Body() bookData: BooksDto,
  ) {
    return this.booksService.update(id, bookData);
  }

@Delete(':id')
  async deleteBook(@Param() { id }: ParamsWithId) {
    return this.booksService.delete(id);
  }


}


