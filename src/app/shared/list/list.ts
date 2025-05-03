import { Component, Input, TemplateRef, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-item-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.html",
  styleUrls: ["./styles.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ItemListComponent<T> {
  @Input() items: T[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
}
