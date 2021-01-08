import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  AuthActionsType,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  RegisterAction, RegisterFailureAction,
  RegisterSuccessAction
} from '../actions/auth.actions';
import UserEntity, { TokenEntity } from '../models/user.model';


@Injectable()
export class AuthEffect {

  authenticate = createEffect(() => this.actions$.pipe(
    ofType<LoginAction>(AuthActionsType.LOGIN),
    exhaustMap((data: LoginAction) =>
      this.authService.authenticate(data.payload)
      .pipe(
        map((res: TokenEntity) => {
          localStorage.setItem('token', res.token);
          return new LoginSuccessAction(res);
        }),
        catchError((err: Error) => of(new LoginFailureAction(err)))
      ))
    )
  );

  register = createEffect(() => this.actions$.pipe(
    ofType<RegisterAction>(AuthActionsType.REGISTER),
    exhaustMap((data: RegisterAction) =>
      this.authService.register(data.payload)
        .pipe(
          map((res: UserEntity) => {
            localStorage.setItem('token', res);
            return new RegisterSuccessAction(res);
          }),
          catchError((err: Error) => of(new RegisterFailureAction(err)))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
