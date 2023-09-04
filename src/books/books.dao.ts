import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findOne(id: string) {
    const category = await this.bookModel.findById(id).populate('author');
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  create(categoryData: BooksDto,) {
	console.log("I am creating an books");
    const createdBook = new this.bookModel({
      ...categoryData,
      
    });
    return createdBook.save();
  }

  async update(id: string, bookData: BooksDto) {
    const book = await this.bookModel
      .findByIdAndUpdate(id, bookData)
      .setOptions({ overwrite: true, new: true });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async delete(bookId: string) {
    const result = await this.bookModel.findByIdAndDelete(bookId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}






