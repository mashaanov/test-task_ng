import { Component } from "@angular/core";
import booksData from "./assets/books.json";
import { RouterOutlet} from "@angular/router";

@Component({
  selector: "purchase-app",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [RouterOutlet],
})
export class AppComponent {
  items = booksData;
}
