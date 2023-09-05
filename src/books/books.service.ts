import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { BooksDto } from 'src/dto/book.dto';
import { BooksDao } from './books.dao';

@Injectable()
export class BooksService {

  constructor(private readonly booksDao: BooksDao) { }


  async findAllBooks() {
    return this.booksDao.findAll();
  }

  async findBookById(id: ObjectId) {

    return this.booksDao.findOne(id);
  }

  createBook(categoryData: BooksDto,) {
    return this.booksDao.create(categoryData);
  }

  async updateBook(id: ObjectId, bookData: BooksDto) {
    return this.booksDao.update(id, bookData);
  }

  async deleteBook(bookId: ObjectId) {
    return this.booksDao.delete(bookId);
  }
}






