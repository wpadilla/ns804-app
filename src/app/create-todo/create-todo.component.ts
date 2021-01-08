import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  title: FormControl = new FormControl();
  desc: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  create() {

  }

}
