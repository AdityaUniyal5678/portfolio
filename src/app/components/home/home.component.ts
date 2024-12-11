import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'adi-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  projects: Array<any> = [
    {
      title: 'Project 1',
      description: '',
      link: 'https://www.sunflame.com',
    },
    { title: 'Project 1', description: '', link: 'https://www.sun.com' },
    { title: 'Project 1', description: '', link: '' },
    { title: 'Project 1', description: '', link: '' },
    { title: 'Project 1', description: '', link: '' },
    { title: 'Project 1', description: '', link: '' },
  ];
  contacts: Array<any> = [
    {
      name: '',
      description: '',
      phoneno: '',
      link: 'https://github.com/AdityaUniyal5678',
    },
  ];
}
