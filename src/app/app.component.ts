import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor(private router: Router) {}
  tokenAvailable: boolean;

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      this.tokenAvailable = !!localStorage.getItem('token');
    });
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
