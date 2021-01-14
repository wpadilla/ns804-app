import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisterAction } from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import AppState from '../store/models/app-state.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../store/reducers/auth.reducer';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fadeInAnimation, horizontalSlideAnimation, popInAnimation } from '../../utils/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
    fadeInAnimation,
    popInAnimation,
    horizontalSlideAnimation,
  ],
})
export class RegisterComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  auth: Observable<AuthState> = this.store.select((state: AppState) => state.auth || {});
  startLoading: boolean | any = undefined;
  open: boolean;
  constructor(
    private store: Store<AppState>,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.startLoading = true;
    const payload = { email: this.email.value, password: this.password.value };
    this.store.dispatch(new RegisterAction(payload));
    this.email.disable();
    this.password.disable();
    const subscription = this.auth.subscribe(auth => {
      if(!auth.loading) {
        this.email.enable();
        this.password.enable();
        this.startLoading = false;
      }
      if (auth.err === undefined) {
        this.router.navigate(['login']);
        subscription.unsubscribe();
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['login'])
  }
}
