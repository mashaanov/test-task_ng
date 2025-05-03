import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Button } from "../button/button";
import { Book } from "../../models/book.model";
import { RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-book-item",
  standalone: true,
  templateUrl: "./book-item.html",
  styleUrls: ["./styles.css"],
  imports: [Button, RouterModule, NgIf],
})
export default class BookItem {
  @Input() item!: {
    url: string;
    isbn13: string;
    title: string;
    price: string;
    subtitle: string;
    image: string;
  };
  @Input() mode: "add" | "remove";
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  onAdd(): void {
    this.add.emit(this.item);
    console.log("Added:", this.item);
  }
  onRemove(): void {
    this.remove.emit(this.item);
    console.log("Removed:", this.item);
  }
}
