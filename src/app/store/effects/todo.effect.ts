import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import TodoEntity from '../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { LoadTodoAction, LoadTodoFailureAction, LoadTodoSuccessAction, TodoActionsTypes } from '../actions/todo.actions';


@Injectable()
export class TodoEffect {

  loadTodo = createEffect(() => this.actions$.pipe(
    ofType<LoadTodoAction>(TodoActionsTypes.LOAD_TODO),
    mergeMap((data: LoadTodoAction) => {
      return this.todoService.loadTodo(data.payload)
      .pipe(
        map((res: { data: TodoEntity }) => {
          return new LoadTodoSuccessAction(res.data);
        }),
        catchError((err: Error) => of(new LoadTodoFailureAction(err)))
      )}
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}
}
