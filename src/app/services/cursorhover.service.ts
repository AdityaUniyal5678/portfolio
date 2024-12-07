import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CursorHoverService {
  // Cursor position subjects
  private cursorXSubject = new BehaviorSubject<number>(0);
  private cursorYSubject = new BehaviorSubject<number>(0);
  private isCursorFadedSubject = new BehaviorSubject<boolean>(false);

  cursorX$ = this.cursorXSubject.asObservable();
  cursorY$ = this.cursorYSubject.asObservable();
  isCursorFaded$ = this.isCursorFadedSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Update cursor position
  updateCursorPosition(event: MouseEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cursorXSubject.next(event.pageX - 15);
      this.cursorYSubject.next(event.pageY - 15);
    }
  }

  // Toggle cursor fade
  setCursorFade(isFaded: boolean): void {
    this.isCursorFadedSubject.next(isFaded);
  }

  // Get current cursor state
  getCurrentCursorState() {
    return {
      x: this.cursorXSubject.value,
      y: this.cursorYSubject.value,
      isFaded: this.isCursorFadedSubject.value,
    };
  }
}
