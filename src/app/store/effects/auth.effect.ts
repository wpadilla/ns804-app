import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { LoginService } from '../../services/auth/login.service';
import { loginAction, LoginSuccessAction } from '../actions/auth.actions';
import UserEntity from '../models/user.model';


@Injectable()
export class AuthEffect {

  authenticate = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    exhaustMap((data) =>
      this.loginService.authenticate(data)
      .pipe(
        map((credentials: UserEntity) => (new LoginSuccessAction(credentials))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}
}
