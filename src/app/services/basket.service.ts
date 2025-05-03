import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { CartItem } from "../models/cartItem.model";
import { Book } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  totalItems$ = this.cartItems$.pipe(map((items) => items.length));

  totalCost$ = this.cartItems$.pipe(
    map((items) => {
      const total = items.reduce((acc, item) => {
        const price = parseFloat(item.book.price.replace(/[^\d.]/g, ""));
        return acc + price * item.quantity;
      }, 0);
      return Math.round(total * 100) / 100;
    })
  );

  constructor() {
    const savedItems = localStorage.getItem("basketItems");
    if (savedItems) {
      try {
        const parsedItems: CartItem[] = JSON.parse(savedItems);
        this.cartItemsSubject.next(parsedItems);
      } catch (e) {
        console.error("Ошибка при парсинге корзины из localStorage:", e);
      }
    }
  }

  private saveItems(items: CartItem[]) {
    localStorage.setItem("basketItems", JSON.stringify(items));
  }

  get getCartItems$() {
    return this.cartItems$;
  }

  addItem(book: Book) {
    const currentItems = [...this.cartItemsSubject.value];
    const index = currentItems.findIndex(
      (item) => item.book.isbn13 === book.isbn13
    );
    if (index > -1) {
      currentItems[index].quantity += 1;
    } else {
      currentItems.push({ book, quantity: 1 });
    }
    this.cartItemsSubject.next(currentItems);
    this.saveItems(currentItems);
  }

  removeItem(bookId: string) {
    const filteredItems = this.cartItemsSubject.value.filter(
      (item) => item.book.isbn13 !== bookId
    );
    this.cartItemsSubject.next(filteredItems);
    this.saveItems(filteredItems);
  }

  increaseQuantity(bookId: string): void {
    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex((item) => item.book.isbn13 === bookId);
    if (index > -1) {
      items[index].quantity += 1;
      this.cartItemsSubject.next(items);
      this.saveItems(items);
    }
  }

  decreaseQuantity(bookId: string): void {
    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex((item) => item.book.isbn13 === bookId);
    if (index > -1) {
      if (items[index].quantity > 1) {
        items[index].quantity -= 1;
      } else {
        items.splice(index, 1);
      }
      this.cartItemsSubject.next(items);
      this.saveItems(items);
    }
  }

  isInCart(isbn: string): boolean {
    return this.cartItemsSubject.value.some(
      (item) => item.book.isbn13 === isbn
    );
  }
}
