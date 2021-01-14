import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
}
