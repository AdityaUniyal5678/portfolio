import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portfolio';
  // Timer variables
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  // Cursor variables
  cursorX: number = 0;
  cursorY: number = 0;
  isCursorFaded: boolean = false;

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

  // Cursor Tracking
  // @HostListener('document:mousemove')
  // @HostListener('document:mousedown')
  // @HostListener('document:keypress')
  // @HostListener('document:wheel')
  // @HostListener('document:touchmove')
  // @HostListener('window:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent): void {
  //   this.cursorX = event.pageX - 15;
  //   this.cursorY = event.pageY - 15;
  // }

  // // Menu Hover Effects
  // @HostListener('document:mouseenter', ['$event'])
  // onMouseEnter(event: MouseEvent): void {
  //   this.cursorX = event.clientX - 100;
  //   this.cursorY = event.clientY - 100;
  // }

  // onMenuHoverEnter(): void {
  //   this.isCursorFaded = true;
  // }

  // onMenuHoverLeave(): void {
  //   this.isCursorFaded = false;
  // }

  // private resetInactivityTimer(): void {
  //   clearTimeout(this.timeoutID);
  //   this.goActive();
  //   this.startInactivityTimer();
  // }

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

  private startInactivityTimer(): void {
    this.timeoutID = setTimeout(() => {
      this.goInactive();
    }, this.INACTIVITY_TIMEOUT);
  }
  // Inactivity Tracker
  private setupInactivityTracker(): void {
    this.startInactivityTimer();
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
}
