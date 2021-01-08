import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { Store } from '@ngrx/store';
import AppState from '../store/models/app-state.model';
import { Observable } from 'rxjs';
import { LoadTodoListAction } from '../store/actions/todoList.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  empty = false;
  todos: Observable<TodoEntity[]> = this.store
    .select((state: AppState) => state.todoList ? state.todoList.data : [])
    .pipe((data: Observable<any>) => {
      data.subscribe( res => {
        this.empty = !res.length;
      });
      return data;
    });

  loading: Observable<boolean> = this.store.select((state: AppState) => state.todoList.loading);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadTodoListAction());
  }

  onTodoClick(): void {

  }

  deleteTodo(todo: TodoEntity): void {

  }
}