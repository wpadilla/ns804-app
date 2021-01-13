import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { TodoListService } from '../../services/todo-list.service';
import TodoEntity from '../models/todo.model';
import { LoadTodoListAction, LoadTodoListFailureAction, LoadTodoListSuccessAction, TodoListActionTypes } from '../actions/todoList.actions';


@Injectable()
export class LoadTodoListEffect {

  loadTodoList = createEffect(() => this.actions$.pipe(
    ofType<LoadTodoListAction>(TodoListActionTypes.LOAD_TODO_LIST),
    mergeMap((data: LoadTodoListAction) => {
      return this.todoListService.loadTodos()
      .pipe(
        map((res: { data: TodoEntity[] }) => {
          return new LoadTodoListSuccessAction(res.data);
        }),
        catchError((err: Error) => of(new LoadTodoListFailureAction(err)))
      )}
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService,
  ) {}
}
