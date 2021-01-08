import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { Store } from '@ngrx/store';
import AppState from '../store/models/app-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  myTodos: Observable<TodoEntity[]> = this.store.select((state: AppState) => state.todoList);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  onTodoClick(): void {

  }
}
