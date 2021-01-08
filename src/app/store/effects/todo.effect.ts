import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { TodoListService } from '../../services/todo-list.service';
import TodoEntity from '../models/todo.model';
import { TodoAction, TodoFailureAction, TodoSuccessAction, TodoListActionTypes } from '../actions/todoList.actions';
import { TodoService } from '../../services/todo.service';


@Injectable()
export class TodoEffect {

  loadTodoList = createEffect(() => this.actions$.pipe(
    ofType<TodoAction>(TodoListActionTypes.LOAD_TODO_LIST),
    mergeMap((data: TodoAction) => {
      return this.todoListService.loadTodos()
      .pipe(
        map((res: { data: TodoEntity[] }) => {
          return new TodoSuccessAction(res.data);
        }),
        catchError((err: Error) => of(new TodoFailureAction(err)))
      )}
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoListService: TodoService,
  ) {}
}
