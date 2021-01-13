import { Component, OnInit } from '@angular/core';
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
        animate('.500s .1s ease-out')
      ]),
      transition('loading => loaded', [
        animate('.300s .1s ease-in')
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  auth: Observable<AuthState> = this.store.select((state: AppState) => state.auth || {});
  startLoading: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {

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
        console.log(auth.err);
        location.href = '/';
      }
    });

  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
}
