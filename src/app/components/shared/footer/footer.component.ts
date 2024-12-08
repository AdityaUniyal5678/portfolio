import { Component, HostListener, Inject } from '@angular/core';
import { CursorHoverService } from '../../../services/cursorHover/cursorHover.service';

@Component({
  selector: 'adi-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  // Cursor variables
  cursorX: number = 0;
  cursorY: number = 0;
  isCursorFaded: boolean = false;
  constructor(
    @Inject(CursorHoverService) private cursorHover: CursorHoverService
  ) {}
  // Cursor Tracking
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (event) {
      this.cursorHover.updateCursorPosition(event);
    }
  }
  // Menu Hover Effects
  onMenuHoverEnter(): void {
    this.cursorHover.setCursorFade(true);
  }
  onMenuHoverLeave(): void {
    this.cursorHover.setCursorFade(false);
  }
  // Year in Roman Numerals
  getCurrentYearInRoman(): string {
    const currentYear = new Date().getFullYear();
    return this.convertToRomanNumerals(currentYear);
  }
  private convertToRomanNumerals(num: number): string {
    const values = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' },
    ];
    let result = '';
    for (const { value, symbol } of values) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result;
  }
}
