import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import Header from "../../shared/header/header";
import BookList from "../../shared/book-list/book-list";
import AppToolbar from "../../features/app-toolbar/app-toolbar";

@Component({
  selector: "home-page",
  standalone: true,
  templateUrl: "./home-page.html",
  styleUrls: ["./styles.css"],
  imports: [FormsModule, Header, BookList, AppToolbar],
})
export default class HomePage {
  title: string = "";
}
