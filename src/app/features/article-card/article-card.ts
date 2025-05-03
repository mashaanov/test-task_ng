import { Component, Input } from "@angular/core";
import { Book } from "../../models/book.model";
import { Button } from "../../shared/button/button";
import { BasketService } from "../../services/basket.service";
import { Location } from "@angular/common";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-article-card",
  standalone: true,
  templateUrl: "./article-card.html",
  styleUrls: ["./styles.css"],
  imports: [Button, NgIf],
})
export default class ArticleCard {
  @Input() item!: Book;

  constructor(
    private basketService: BasketService,
    private location: Location
  ) {}

  onAdd(): void {
    this.basketService.addItem(this.item);
  }

  goBack(): void {
    this.location.back();
  }

  get isInCart(): boolean {
    return this.basketService.isInCart(this.item.isbn13);
  }
}
