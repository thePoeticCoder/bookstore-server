import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { BooksDto } from 'src/dto/book.dto';
import { BooksDao } from './books.dao';

@Injectable()
export class BooksService {
  constructor(private readonly booksDao: BooksDao) {}

  //use try catch and send alert in case of any known/unknown exceptions or issues

  async findAllBooks(ctxId: string) {
    console.log(ctxId, 'context id of the request in service file');
    return this.booksDao.findAll();
  }

  async findBookById(ctxId: string, id: ObjectId) {
    console.log(ctxId, 'context id of the request in service file');

    return this.booksDao.findOne(id);
  }

  createBook(ctxId: string, bookData: BooksDto) {
    console.log(ctxId, 'context id of the request in service file');
    return this.booksDao.create(bookData);
  }

  async updateBook(ctxId: string, id: ObjectId, bookData: BooksDto) {
    console.log(ctxId, 'context id of the request in service file');
    return this.booksDao.update(id, bookData);
  }

  async deleteBook(ctxId: string, bookId: ObjectId) {
    console.log(ctxId, 'context id of the request in service file');
    return this.booksDao.delete(bookId);
  }
}
