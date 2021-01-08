import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
} from '../actions/auth.actions';
import { Router } from '@angular/router';
import { LoadTodoAction, TodoActionsTypes } from '../actions/todo.actions';


@Injectable()
export class AuthEffect {

  loadTodo = createEffect(() => this.actions$.pipe(
    ofType<LoadTodoAction>(TodoActionsTypes.LOAD_TODO),
    exhaustMap((data: LoadTodoAction) =>
      this.authService.authenticate(data.payload)
      .pipe(
        map((res: TokenEntity) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['']);
          return new LoginSuccessAction(res);
        }),
        catchError((err: Error) => of(new LoginFailureAction(err)))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
