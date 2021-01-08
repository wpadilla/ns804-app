import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginAction } from '../store/actions/auth.actions';
import AppState from '../store/models/app-state.model';
import { Router } from '@angular/router';
import { TodoListService } from '../services/todo-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  loading: Observable<boolean> = this.store.select((state: AppState) => state.auth && state.auth.loading);

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  login(): void {
    const payload = { email: this.email.value, password: this.password.value };
    this.store.dispatch(new LoginAction(payload));
    this.email.disable();
    this.password.disable();
    this.loading.subscribe(loadState => {
      if(!loadState) {
        this.email.enable();
        this.password.enable();
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
}
