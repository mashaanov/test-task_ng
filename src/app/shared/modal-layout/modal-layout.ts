import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

@Component({
  selector: "app-modal-layout",
  templateUrl: "./modal-layout.html",
  styleUrls: ["./styles.css"],
})
export default class ModalLayout
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() title = "Модалка";
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  @ViewChild("layout") layoutRef!: ElementRef;
  @ViewChild("frame") frameRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      const layout = this.layoutRef.nativeElement;
      const frame = this.frameRef.nativeElement;

      layout.style.alignItems =
        layout.clientHeight < frame.clientHeight ? "flex-start" : "center";
      layout.style.justifyContent =
        layout.clientWidth < frame.clientWidth ? "flex-start" : "center";
    });

    if (this.layoutRef?.nativeElement) {
      this.resizeObserver.observe(this.layoutRef.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["visible"]) {
      if (this.visible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    document.body.style.overflow = "auto";
  }

  onClose(): void {
    this.close.emit();
  }
}
