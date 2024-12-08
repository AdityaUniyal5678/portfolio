import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ButtonsComponent } from './components/shared/header-buttons/buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, RouterOutlet, ButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'portfolio';
}
