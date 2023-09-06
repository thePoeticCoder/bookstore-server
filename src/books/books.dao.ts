import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BooksDto } from '../dto/book.dto';
import { Books, BookDocument } from '../schema/book.schema';

@Injectable()
export class BooksDao {
  constructor(
    @InjectModel(Books.name) private bookModel: Model<BookDocument>,
  ) {}

  async findAll() {
    try {
      return this.bookModel.find();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: ObjectId) {
    try {
      const bookData = await this.bookModel.findById(id);
      if (!bookData) {
        throw new NotFoundException();
      }
      return bookData;
    } catch (e) {
      throw new Error(e);
    }
  }

  create(bookData: BooksDto) {
    try {
      console.log('I am creating an books');
      const createdBook = new this.bookModel({
        ...bookData,
      });
      return createdBook.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: ObjectId, bookData: BooksDto) {
    try {
      const book = await this.bookModel
        .findOneAndReplace(id, bookData)
        .setOptions({ overwrite: true, new: true });
      if (!book) {
        throw new NotFoundException();
      }
      return book;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(bookId: ObjectId) {
    try {
      const result = await this.bookModel.findByIdAndDelete(bookId);
      if (!result) {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
