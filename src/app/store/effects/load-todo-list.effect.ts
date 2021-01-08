import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import {
  LoginFailureAction,
} from '../actions/auth.actions';
import { Router } from '@angular/router';
import { LoadTodoAction, TodoActionsTypes } from '../actions/todo.actions';
import { TodoListService } from '../../services/todo-list.service';
import TodoEntity from '../models/todo.model';
import { LoadTodoListSuccessAction } from '../actions/todoList.actions';


@Injectable()
export class LoadTodoListEffect {

  loadTodo = createEffect(() => this.actions$.pipe(
    ofType<LoadTodoAction>(TodoActionsTypes.LOAD_TODO),
    exhaustMap((data: LoadTodoAction) =>
      this.todoListService.loadTodos()
      .pipe(
        map((res: { data: TodoEntity[] }) => {
          return new LoadTodoListSuccessAction(res.data);
        }),
        catchError((err: Error) => of(new LoginFailureAction(err)))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService,
    private router: Router,
  ) {}
}
