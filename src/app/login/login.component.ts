import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginAction } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();

  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit(): void {

  }

  login() {
    const payload = { email: this.email.value, password: this.password.value };
    this.store.dispatch(new LoginAction(payload));
  }

}
