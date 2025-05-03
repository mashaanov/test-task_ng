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
    private BasketService: BasketService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks$.subscribe((data: BookApiResponse) => {
      this.books = data.books;
    });

    this.BasketService.totalItems$.subscribe((total) => {
      console.log("TotalItems:", total);
    });
  }

  handleAdd(book: Book): void {
    this.BasketService.addItem(book);
    console.log("Добавлена книга с id:", book);
  }
}
