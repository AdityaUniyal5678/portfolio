import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CursorHoverService } from '../../services/cursorhover.service';

@Component({
  selector: 'adi-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  projects: Array<any> = [
    {
      title: 'Project 1',
      description: 'sasa',
      link: 'https://www.sunflame.com',
    },
    { title: 'Project 1', description: '', link: 'https://www.sun.com' },
    { title: 'Project 1', description: '', link: '' },
    { title: 'Project 1', description: '', link: '' },
    { title: 'Project 1', description: '', link: '' },
    { title: 'Project 1', description: '', link: '' },
  ];
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
  }

  constructor(
    @Inject(CursorHoverService) private cursorHover: CursorHoverService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // Cursor Tracking
  @HostListener('document:mousemove')
  @HostListener('document:mousedown')
  @HostListener('document:keypress')
  @HostListener('document:wheel')
  @HostListener('document:touchmove')
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
