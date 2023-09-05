import { BooksDto } from "./book.dto";

export class CartDto {
  email: String;

  addedBooks: BooksDto[];

  totalAmount: number;

  date: number;
}
