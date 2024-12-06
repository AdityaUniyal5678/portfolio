import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'adi-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  projects: Array<any> = [
    { title: '', description: '', link: '' },
    { title: '', description: '', link: '' },
    { title: '', description: '', link: '' },
    { title: '', description: '', link: '' },
    { title: '', description: '', link: '' },
    { title: '', description: '', link: '' },
  ];
  // Timer variables
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  // Cursor variables
  cursorX: number = 0;
  cursorY: number = 0;
  isCursorFaded: boolean = false;

  // Theme variables
  currentTheme: 'dark' | 'grey' | 'light' = 'dark';

  // Inactivity timer variables
  private timeoutID: any;
  private readonly INACTIVITY_TIMEOUT = 12000; // 12 seconds

  private timerInterval: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize timer
      this.startTimerTick();

      // Setup inactivity tracker
      this.setupInactivityTracker();
    }
  }

  ngOnDestroy() {
    // Clear any ongoing timers
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }

  // Timer Methods
  private startTimerTick(): void {
    // Only run in browser
    if (isPlatformBrowser(this.platformId)) {
      this.timerInterval = setInterval(() => {
        const now = new Date();
        this.hours = this.padZero(now.getHours());
        this.minutes = this.padZero(now.getMinutes());
        this.seconds = this.padZero(now.getSeconds());
      }, 1000);
    }
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  // Cursor Tracking
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.cursorX = event.pageX - 15;
    this.cursorY = event.pageY - 15;
  }

  // Menu Hover Effects
  onMenuHoverEnter(): void {
    setTimeout(() => {
      this.isCursorFaded = true;
    }, 300);
  }

  onMenuHoverLeave(): void {
    this.isCursorFaded = false;
  }

  // Theme Toggle
  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      switch (this.currentTheme) {
        case 'dark':
          this.currentTheme = 'grey';
          break;
        case 'grey':
          this.currentTheme = 'light';
          break;
        default:
          this.currentTheme = 'dark';
      }
      this.document.documentElement.setAttribute(
        'data-theme',
        this.currentTheme
      );
    }
  }
  // Fullscreen Toggle
  toggleFullscreen(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elem = this.document.documentElement;

      if (!this.document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if ((elem as any).mozRequestFullScreen) {
          // Firefox
          (elem as any).mozRequestFullScreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).msRequestFullscreen) {
          // Internet Explorer/Edge
          (elem as any).msRequestFullscreen();
        }
      } else {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if ((this.document as any).mozCancelFullScreen) {
          // Firefox
          (this.document as any).mozCancelFullScreen();
        } else if ((this.document as any).webkitExitFullscreen) {
          // Chrome, Safari and Opera
          (this.document as any).webkitExitFullscreen();
        } else if ((this.document as any).msExitFullscreen) {
          // Internet Explorer/Edge
          (this.document as any).msExitFullscreen();
        }
      }
    }
  }

  // Inactivity Tracker
  private setupInactivityTracker(): void {
    this.startInactivityTimer();
  }

  @HostListener('document:mousemove')
  @HostListener('document:mousedown')
  @HostListener('document:keypress')
  @HostListener('document:wheel')
  @HostListener('document:touchmove')
  private resetInactivityTimer(): void {
    clearTimeout(this.timeoutID);
    this.goActive();
    this.startInactivityTimer();
  }

  private startInactivityTimer(): void {
    this.timeoutID = setTimeout(() => {
      this.goInactive();
    }, this.INACTIVITY_TIMEOUT);
  }

  private goInactive(): void {
    // You would typically use Angular animations or a service for this
    if (isPlatformBrowser(this.platformId)) {
      const activityElement = this.document.querySelector(
        '.activity'
      ) as HTMLElement;
      if (activityElement) {
        activityElement.style.opacity = '1';
        activityElement.style.visibility = 'visible';
      }
    }
  }

  private goActive(): void {
    if (isPlatformBrowser(this.platformId)) {
      const activityElement = this.document.querySelector(
        '.activity'
      ) as HTMLElement;
      if (activityElement) {
        activityElement.style.opacity = '0';
        activityElement.style.visibility = 'hidden';
      }
    }
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
