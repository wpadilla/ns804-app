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
import { fadeInAnimation, horizontalSlideAnimation, popInAnimation } from '../../utils/animations';
import { LoadTodoListAction } from '../store/actions/todoList.actions';

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
    fadeInAnimation,
    popInAnimation,
    horizontalSlideAnimation,
  ],
})

export class LoginComponent  {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  auth: Observable<AuthState> = this.store.select((state: AppState) => state.auth || {});
  startLoading: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  login(): void {
    this.startLoading = true;
    const payload = { email: String(this.email.value).toLowerCase().replace(/[' ']/gi, ''), password: this.password.value };
    this.store.dispatch(new LoginAction(payload));
    this.email.disable();
    this.password.disable();
    this.auth.subscribe(auth => {
      if(!auth.loading) {
        this.email.enable();
        this.password.enable();
        this.startLoading = false;
      }
    });

  }

  goToRegister(): void {

    this.router.navigate(['register']);


  }
}
