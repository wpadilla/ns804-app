import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {
  todo: TodoEntity;
  constructor() { }

  ngOnInit(): void {
  }

}
