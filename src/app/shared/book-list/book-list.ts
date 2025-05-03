import { Component, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import { BasketService } from "../../services/basket.service";
import { Book, BookApiResponse } from "../../models/book.model";
import BookItem from "../book-item/book-item";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.html",
  standalone: true,
  imports: [BookItem],
})
export default class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks$.subscribe((data: BookApiResponse) => {
      this.books = data.books;
    });

    this.basketService.totalItems$.subscribe((total) => {
      console.log("TotalItems:", total);
    });
  }

  handleAdd(book: Book): void {
    this.basketService.addItem(book);
    console.log("Добавлена книга с id:", book);
  }


  isInCart(bookId: string): boolean {
    return this.basketService.isInCart(bookId);
  }
}
