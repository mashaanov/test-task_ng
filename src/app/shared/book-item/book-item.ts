import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Button } from "../button/button";
import { Book } from "../../models/book.model";
import { RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";
import { CartItem } from "src/app/models/cartItem.model";

@Component({
  selector: "app-book-item",
  standalone: true,
  templateUrl: "./book-item.html",
  styleUrls: ["./styles.css"],
  imports: [Button, RouterModule, NgIf],
})
export default class BookItem {
  @Input() item!: CartItem | Book;
  @Input() mode: "add" | "remove";
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();
  @Output() increase = new EventEmitter<string>();
  @Output() decrease = new EventEmitter<string>();

  get book(): Book {
    return (this.item as CartItem).book || (this.item as Book);
  }

  getTitle(): string {
    return this.book.title;
  }

  getPrice(): string {
    return this.book.price;
  }

  getImage(): string {
    return this.book.image;
  }

  getIsbn(): string {
    return this.book.isbn13;
  }

  getSubtitle(): string {
    return this.book.subtitle;
  }

  onAdd(): void {
    this.add.emit(this.book);
    console.log("Added:", this.book);
  }

  onRemove(): void {
    this.remove.emit(this.book);
    console.log("Removed:", this.book);
  }

  @Input() isInCart = false;
}
