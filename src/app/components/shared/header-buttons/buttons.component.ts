import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CursorHoverService } from '../../../services/cursorHover/cursorHover.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'adi-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent implements OnInit, OnDestroy {
  // Timer variables
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  private timerInterval: any;
  // Inactivity timer variables
  private timeoutID: any;
  private readonly INACTIVITY_TIMEOUT = 12000; // 12 seconds
  // Cursor variables
  cursorX: number = 0;
  cursorY: number = 0;
  isCursorFaded: boolean = false;
  // Theme variables
  currentTheme: 'dark' | 'grey' | 'light' = 'dark';

  ngOnInit(): void {
    this.cursorHover.cursorX$.subscribe((x) => (this.cursorX = x));
    this.cursorHover.cursorY$.subscribe((y) => (this.cursorY = y));
    this.cursorHover.isCursorFaded$.subscribe(
      (isFaded) => (this.isCursorFaded = isFaded)
    );
    if (isPlatformBrowser(this.platformId)) {
      // Initialize timer
      this.startTimerTick();

      // Setup inactivity tracker
      this.setupInactivityTracker();
    }
  }

  constructor(
    @Inject(CursorHoverService) private cursorHover: CursorHoverService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
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

  // WHOLE TIMER TYPESCRIPT
  ngOnDestroy() {
    // Clear any ongoing timers
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }
  private startInactivityTimer(): void {
    this.timeoutID = setTimeout(() => {
      this.goInactive();
    }, this.INACTIVITY_TIMEOUT);
  }
  // Inactivity Tracker
  private setupInactivityTracker(): void {
    this.startInactivityTimer();
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
  private goInactive(): void {
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
}
