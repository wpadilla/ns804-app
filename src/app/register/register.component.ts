import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    // code to log in
  }
}
