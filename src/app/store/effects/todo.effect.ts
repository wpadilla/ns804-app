import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import TodoEntity from '../models/todo.model';
import { TodoService } from '../../services/todo.service';
import {
  AddTodoAction, AddTodoFailureAction, AddTodoSuccessAction,
  DeleteTodoAction, DeleteTodoFailureAction,
  DeleteTodoSuccessAction,
  LoadTodoAction,
  LoadTodoFailureAction,
  LoadTodoSuccessAction,
  TodoActionsTypes, UpdateTodoAction, UpdateTodoFailureAction, UpdateTodoSuccessAction
} from '../actions/todo.actions';


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

  deleteTodo = createEffect(() => this.actions$.pipe(
    ofType<DeleteTodoAction>(TodoActionsTypes.DELETE_TODO),
    mergeMap((data: DeleteTodoAction) => {
      return this.todoService.deleteTodo(data.payload)
        .pipe(
          map((res: { data: TodoEntity }) => {
            return new DeleteTodoSuccessAction(res.data);
          }),
          catchError((err: Error) => of(new DeleteTodoFailureAction(err)))
        )}
    )
    )
  );

  updateTodo = createEffect(() => this.actions$.pipe(
    ofType<UpdateTodoAction>(TodoActionsTypes.UPDATE_TODO),
    mergeMap((data: UpdateTodoAction) => {
      return this.todoService.updateTodo(data.payload)
        .pipe(
          map((res: { data: TodoEntity }) => {
            return new UpdateTodoSuccessAction(res.data);
          }),
          catchError((err: Error) => of(new UpdateTodoFailureAction(err)))
        )}
    )
    )
  );

  addTodo = createEffect(() => this.actions$.pipe(
    ofType<AddTodoAction>(TodoActionsTypes.ADD_TODO),
    mergeMap((data: AddTodoAction) => {
      return this.todoService.addTodo(data.payload)
        .pipe(
          map((res: { data: TodoEntity }) => {
            return new AddTodoSuccessAction(res.data);
          }),
          catchError((err: Error) => of(new AddTodoFailureAction(err)))
        )}
    )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}
}
