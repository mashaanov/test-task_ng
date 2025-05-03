import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.html",
  styleUrls: ["./styles.css"],
  imports: [FormsModule],
})
export default class Header {
  @Input() heading: string = "Book Store"
}
