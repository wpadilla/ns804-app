import { Component, Input } from '@angular/core';
import { fadeInAnimation, topSlideAnimation } from '../../utils/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    topSlideAnimation,
  ]
})
export class HeaderComponent {
  @Input() tokenAvailable;
  constructor() {}

  logOut(): void {
    localStorage.removeItem('token');
    location.href = '/login';
  }
}
