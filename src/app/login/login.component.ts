import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginAction } from '../store/actions/auth.actions';
import AppState from '../store/models/app-state.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../store/reducers/auth.reducer';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('startLoading', [
      state('loaded', style({
        left: 0,
      })),
      state('loading', style({
        left: '-550px',
      })),
      transition('loaded => loading', [
        animate('.3s .1s ease-out')
      ]),
      transition('loading => loaded', [
        animate('.3s .1s ease-in')
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.5s', style({ opacity: 0 })),
      ]),
    ]),
    trigger('popIn', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('.3s', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('.3s', style({ transform: 'scale(0)' })),
      ]),
    ]),
    trigger('horizonTalSlide', [
      transition(':enter', [
        style({ transform: 'translateX(1000px)' }),
        animate('.7s', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('.7s', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})

export class LoginComponent implements OnInit, AfterViewInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  auth: Observable<AuthState> = this.store.select((state: AppState) => state.auth || {});
  startLoading: boolean;
  fadeIn: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout( () => this.fadeIn = true);
  }

  login(): void {
    this.startLoading = true;
    const payload = { email: this.email.value, password: this.password.value };
    this.store.dispatch(new LoginAction(payload));
    this.email.disable();
    this.password.disable();
    this.auth.subscribe(auth => {
      if(!auth.loading) {
        this.email.enable();
        this.password.enable();
        this.startLoading = false;
      }
      if (auth.err === undefined) {
        this.router.navigate(['/']);
      }
    });

  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
}
