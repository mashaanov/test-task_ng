import { Component, OnInit } from "@angular/core";
import Header from "../../shared/header/header";
import ArticleCard from "../../features/article-card/article-card";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../../models/book.model";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [Header, ArticleCard],
  templateUrl: "./product-details.html",
})
export default class ProductDetailsPage implements OnInit {
  book!: Book;
  isbn13: string | null = null;
  cart: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.isbn13 = this.route.snapshot.paramMap.get("id");
    if (this.isbn13) {
      this.book = this.bookService.getBookByIsbn(this.isbn13)!;
    }
  }
}
