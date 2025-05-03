import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private _visible = new BehaviorSubject<boolean>(false);

  get visible$(): Observable<boolean> {
    return this._visible.asObservable();
  }

  open(): void {
    this._visible.next(true);
  }

  close(): void {
    this._visible.next(false);
  }
}
