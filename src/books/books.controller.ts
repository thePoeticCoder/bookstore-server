
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { JwtVerification } from 'src/middleware/jwtAuth.middleware';
import { CtxId } from 'src/middleware/contextId.decorators';
import { ApiResponse } from 'src/middleware/apiresponse';

@Controller('books')
@UseInterceptors(MongooseClassSerializerInterceptor(Books))
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @JwtVerification()
  @Get()
  async getAllBooks(@CtxId() ctxId: string,) {
    console.log(ctxId, "context id of the request in controller");
    const data =  await this.booksService.findAllBooks(ctxId);
    return new ApiResponse(data,ctxId)
  }
  @JwtVerification()
  @Get(':id')
  async getBook(@CtxId() ctxId: string,
    @Param() { id }: ParamsWithId) {
    console.log(ctxId, "context id of the request in controller");
    const data =  this.booksService.findBookById(ctxId,id);
     return new ApiResponse(data,ctxId)
  }
  @JwtVerification()
  @Post('createBook')
  async createBook(@CtxId() ctxId: string,
    @Body() bookData: BooksDto,

  ) {
   console.log(ctxId, "context id of the request in controller");
    const data =  await this.booksService.createBook(ctxId,bookData);
     return new ApiResponse(data,ctxId)
  }
  @JwtVerification()
  @Put('updateBookById')
  async updateBook(
    @CtxId() ctxId: string,
    @Param() { id }: ParamsWithId,
    @Body() bookData: BooksDto,
  ) {
    console.log(ctxId, "context id of the request in controller");
    const data =  this.booksService.updateBook(ctxId,id, bookData);
     return new ApiResponse(data,ctxId)
  }

  @JwtVerification()
  @Delete('deleteBookById')
  async deleteBook(@CtxId() ctxId: string,
    @Param() { id }: ParamsWithId) {
   console.log(ctxId, "context id of the request in controller");
    const data =  this.booksService.deleteBook(ctxId,id);
     return new ApiResponse(data,ctxId)
  }
}


