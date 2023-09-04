import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksDto } from 'src/dto/book.dto';
import { Books,BookDocument } from 'src/schema/book.schema';
import { BooksDao } from './books.dao';

@Injectable()
export class BooksService {

	constructor(private readonly booksDao: BooksDao) {}


  async findAllBooks() {
    return this.booksDao.findAll();
  }

  async findBookById(id: string) {
    
	return this.booksDao.findOne(id);
  }

  createBook(categoryData: BooksDto,) {
		return this.booksDao.create(categoryData);
  }

  async updateBook(id: string, bookData: BooksDto) {
		return this.booksDao.update(id,bookData);
  }

  async deleteBook(bookId: string) {
		return this.booksDao.delete(bookId);
  }
}






