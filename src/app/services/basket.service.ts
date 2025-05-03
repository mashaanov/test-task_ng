import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Book } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  private cartItemsSubject = new BehaviorSubject<Book[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  totalItems$ = this.cartItems$.pipe(map((items) => items.length));

  totalCost$ = this.cartItems$.pipe(
    map((items) => {
      return items.reduce(
        (acc, item) => acc + Number(item.price.replace(/[^\d.]/g, "")),
        0
      );
    })
  );

  constructor() {
    const savedItems = localStorage.getItem("basketItems");
    if (savedItems) {
      this.cartItemsSubject.next(JSON.parse(savedItems));
    }
  }

  private saveItems(items: Book[]) {
    localStorage.setItem("basketItems", JSON.stringify(items));
  }

  get getCartItems$() {
    return this.cartItems$;
  }

  addItem(book: Book) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, book];
    this.cartItemsSubject.next([...currentItems, book]);
    this.saveItems(updatedItems);
  }

  removeItem(bookId: string) {
    const filteredItems = this.cartItemsSubject.value.filter(
      (item) => item.isbn13 !== bookId
    );
    this.cartItemsSubject.next(filteredItems);
    this.saveItems(filteredItems);
  }
}
