import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BookService } from "../../services/book.service";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import BasketTool from "../../shared/basket/basket-tool";

@Component({
  selector: "app-toolbar",
  templateUrl: "./app-toolbar.html",
  styleUrls: ["./styles.css"],
  imports: [FormsModule, MatIconModule, MatSelectModule, BasketTool],
})
export default class AppToolbar implements OnInit {
  search = "";
  sortField: "title" | "price" | "default" = "default";
  sortOrder: "asc" | "desc" | "default" = "default";

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["search"]) {
        this.search = params["search"];
      }
      if (params["sortField"]) {
        this.sortField = params["sortField"];
      }
      if (params["sortOrder"]) {
        this.sortOrder = params["sortOrder"];
      }
      this.bookService.searchBooks(this.search);
      this.bookService.onSort(this.sortField, this.sortOrder);
    });
  }

  onSearch(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: this.search },
      queryParamsHandling: "merge",
    });
    this.bookService.searchBooks(this.search);
  }

  onFieldChange(field: "title" | "price" | "default"): void {
    this.sortField = field;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sortField: this.sortField, sortOrder: this.sortOrder, search: this.search },
      queryParamsHandling: "merge",
    });
    this.bookService.onSort(this.sortField, this.sortOrder);
  }
  
  onOrderChange(order: "asc" | "desc" | "default"): void {
    this.sortOrder = order;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sortField: this.sortField, sortOrder: this.sortOrder, search: this.search },
      queryParamsHandling: "merge",
    });
    this.bookService.onSort(this.sortField, this.sortOrder);
  }

  resetFilters(): void {
    this.search = "";
    this.sortField = "default";
    this.sortOrder = "default";

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: this.search, sortField: this.sortField, sortOrder: this.sortOrder },
      queryParamsHandling: "merge",
    });

    this.bookService.searchBooks(this.search);
    this.bookService.onSort(this.sortField, this.sortOrder);
  }
}