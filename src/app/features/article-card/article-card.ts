import { Component, Input } from "@angular/core";
import { Book } from "../../models/book.model";
import { Button } from "../../shared/button/button";
import { BasketService } from "../../services/basket.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-article-card",
  standalone: true,
  templateUrl: "./article-card.html",
  styleUrls: ["./styles.css"],
  imports: [Button],
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
}
