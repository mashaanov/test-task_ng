import { Book } from "../models/book.model"

export interface CartItem {
    book: Book,
    quantity: number,
}