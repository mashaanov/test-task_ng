import { Component } from "@angular/core";
import { BasketService } from "../../services/basket.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { ModalService } from "../../services/modal.service";
import ModalLayout from "../modal-layout/modal-layout";
import { CartItem } from "src/app/models/cartItem.model";
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
    ItemListComponent,
    BookItem,
  ],
})
export default class BasketTool {
  totalItems$!: Observable<number>;
  cartItems$!: Observable<CartItem[]>;
  totalCost$!: Observable<number>;
  isModalVisible = false;

  constructor(
    private basketService: BasketService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.totalItems$ = this.basketService.totalItems$;
    this.cartItems$ = this.basketService.getCartItems$;
    this.totalCost$ = this.basketService.totalCost$
  }

  openModalCart() {
    this.isModalVisible = true;
    this.modalService.open();
  }

  closeModal() {
    this.isModalVisible = false;
    this.modalService.close();
  }

  handleRemove(item: CartItem): void {
    this.basketService.removeItem(item.book.isbn13);
  }

  handleIncrease(bookId: string): void {
    this.basketService.increaseQuantity(bookId);
  }

  handleDecrease(bookId: string): void {
    this.basketService.decreaseQuantity(bookId);
  }
}
