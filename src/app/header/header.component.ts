import { Component, Input } from '@angular/core';
import { fadeInAnimation, topSlideAnimation } from '../../utils/animations';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
