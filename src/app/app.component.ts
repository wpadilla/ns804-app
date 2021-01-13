import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { routerSlideInAnimation } from '../utils/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerSlideInAnimation,
  ]
})
export class AppComponent implements OnInit {

  title = 'app';
  constructor(private router: Router) {}
  tokenAvailable: boolean;
  ngOnInit(): void {
    this.router.events.subscribe(e => {
      this.tokenAvailable = !!localStorage.getItem('token');
    });
  }

  logOut(): void {
    localStorage.removeItem('token');
    location.href = '/login';
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
