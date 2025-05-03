import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import booksData from "../assets/books.json";
import { Book, BookApiResponse } from "../models/book.model";

@Injectable({ providedIn: "root" })
export class BookService {
  private originalBooks: Book[] = booksData.books.map((book) => ({
    ...book,
    quantity: 1,
  }));
  private filteredBooks: Book[] = structuredClone(this.originalBooks);

  private booksSubject = new BehaviorSubject<BookApiResponse>({
    error: "",
    total: this.filteredBooks.length.toString(),
    books: this.filteredBooks,
  });

  private params = {
    sort: "default",
    query: "",
  };

  private saveBooksState(): void {
    localStorage.setItem(
      "booksState",
      JSON.stringify({
        books: this.filteredBooks,
        total: this.filteredBooks.length,
        params: this.params,
      })
    );
  }

  get getBooks$() {
    return this.booksSubject.asObservable();
  }

  getTotal() {
    return this.booksSubject.getValue().total;
  }

  private updateBooks(): void {
    this.booksSubject.next({
      error: "",
      total: this.filteredBooks.length.toString(),
      books: this.filteredBooks,
    });

    this.saveBooksState();
  }

  searchBooks(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredBooks = this.originalBooks.filter((book) => {
      return (
        book.title.toLowerCase().includes(lowerQuery) ||
        book.subtitle.toLowerCase().includes(lowerQuery)
      );
    });
    this.updateBooks();
  }

  onSort(field: string, order: string) {
    this.filteredBooks.sort((a, b) => {
      const valueA =
        field === "price"
          ? parseFloat(a[field].replace(/[^0-9.]/g, ""))
          : a[field].toLocaleLowerCase();
      const valueB =
        field === "price"
          ? parseFloat(b[field].replace(/[^0-9.]/g, ""))
          : b[field].toLocaleLowerCase();

      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      } else if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

  getBookByIsbn(isbn13: string): Book | undefined {
    const found = this.filteredBooks.find((book) => book.isbn13 === isbn13);
    return found;
  }
}
