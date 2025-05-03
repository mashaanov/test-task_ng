import { Component } from "@angular/core";
import { BasketService } from "../../services/basket.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { ModalService } from "../../services/modal.service";
import ModalLayout from "../modal-layout/modal-layout";
import { NgTemplateOutlet, NgIf, NgFor } from "@angular/common";
import { Book } from "../../models/book.model";
import { ItemListComponent } from "../list/list";
import BookItem from "../book-item/book-item";

@Component({
  selector: "app-basket-tool",
  templateUrl: "./basket-tool.html",
  styleUrls: ["./styles.css"],
  standalone: true,
  imports: [
    CommonModule,
    ModalLayout,
    NgTemplateOutlet,
    NgIf,
    NgFor,
    ItemListComponent,
    BookItem,
  ],
})
export default class BasketTool {
  totalItems$!: Observable<number>;
  cartItems$!: Observable<Book[]>;
  isModalVisible = false;

  constructor(
    private basketService: BasketService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.totalItems$ = this.basketService.totalItems$;
    this.cartItems$ = this.basketService.getCartItems$;
  }

  openModalCart() {
    this.isModalVisible = true;
    this.modalService.open();
  }

  closeModal() {
    this.isModalVisible = false;
    this.modalService.close();
  }

  handleRemove(item: Book): void {
    this.basketService.removeItem(item.isbn13);
  }
}
