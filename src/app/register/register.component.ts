import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisterAction } from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import AppState from '../store/models/app-state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();

  constructor(
    private store: Store<AppState>,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    const payload = { email: this.email.value, password: this.password.value };
    this.store.dispatch(new RegisterAction(payload));
  }
}
