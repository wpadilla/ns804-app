import { AfterViewInit, Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { Store } from '@ngrx/store';
import AppState from '../store/models/app-state.model';
import { Observable } from 'rxjs';
import { LoadTodoListAction } from '../store/actions/todoList.actions';
import { Router } from '@angular/router';
import { fadeInAnimation, popInAnimation } from '../../utils/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    popInAnimation,
    fadeInAnimation,
  ]
})
export class TodoListComponent implements OnInit {
  empty = false;

  filteredTodos: TodoEntity[] = [];

  todos: Observable<TodoEntity[]> = this.store
    .select((state: AppState) => state.todoList ? state.todoList.data : [])
    .pipe((data: Observable<any>) => {
      data.subscribe(res => {
        this.empty = !res.length;
      });
      return data;
    });

  loading: Observable<boolean> = this.store.select((state: AppState) => state.todoList && state.todoList.loading);

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTodoListAction());
    this.todos.subscribe(res => this.filteredTodos = res);
  }

  onTodoClick(todo: TodoEntity): void {
    this.router.navigate([`/todo/${todo._id}`]);
  }

  goToCreate(): void {
    this.router.navigate(['create-todo']);
  }

  searchTodos(event): void {
    const {value} = event.target;

    this.todos.subscribe(res => {

      this.filteredTodos = res.filter(item => {
        const regExp = /[ ]gi/;
        const trimmedValue = value && value.toLowerCase().replace(regExp, '');
        const stringifiedItem = JSON.stringify(item).toLowerCase().replace(regExp, '');

        const exists = trimmedValue && !!stringifiedItem.includes(trimmedValue);

        return value ? exists : item;
      });

      this.empty = !this.filteredTodos.length;


    });
  }
}
