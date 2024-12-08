import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'adi-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
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
}
