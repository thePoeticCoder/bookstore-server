import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BooksDto } from '../dto/book.dto';
import { Books,BookDocument } from '../schema/book.schema';

@Injectable()
export class BooksDao {

  constructor(
    @InjectModel(Books.name) private bookModel: Model<BookDocument>,
  ) {}

  async findAll() {
    return this.bookModel.find().populate('author');
  }

  async findOne(id: ObjectId) {
    const bookData = await this.bookModel.findById(id).populate('author');
    if (!bookData) {
      throw new NotFoundException();
    }
    return bookData;
  }

  create(bookData: BooksDto,) {
	console.log("I am creating an books");
    const createdBook = new this.bookModel({
      ...bookData,
      
    });
    return createdBook.save();
  }

  async update(id: ObjectId, bookData: BooksDto) {
    const book = await this.bookModel
      .findOneAndReplace(id, bookData)
      .setOptions({ overwrite: true, new: true });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async delete(bookId: ObjectId) {
    const result = await this.bookModel.findByIdAndDelete(bookId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}






