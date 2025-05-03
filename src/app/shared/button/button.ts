import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.html",
  styleUrls: ["./styles.css"],
  imports: [CommonModule],
})
export class Button {
  @Input() title = "";
  @Input() btnStyle: "text" | "primary" | "delete" | "outline" = "text";
  @Input() type: "button" | "submit" = "button";
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    this. buttonClick.emit();
  }
}
