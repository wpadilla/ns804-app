import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
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
import { Router } from '@angular/router';


@Injectable()
export class AuthEffect {

  authenticate = createEffect(() => this.actions$.pipe(
    ofType<LoginAction>(AuthActionsType.LOGIN),
    exhaustMap((data: LoginAction) =>
      this.authService.authenticate(data.payload)
      .pipe(
        map((res: TokenEntity) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
          return new LoginSuccessAction(res);
        }),
        catchError((err: any) => {
          return of(new LoginFailureAction(err.error));
        }),
      ))
    )
  );

  register = createEffect(() => this.actions$.pipe(
    ofType<RegisterAction>(AuthActionsType.REGISTER),
    exhaustMap((data: RegisterAction) =>
      this.authService.register(data.payload)
        .pipe(
          map((res: UserEntity) => {
            return new RegisterSuccessAction(res);
          }),
          catchError((err: any) => of(new RegisterFailureAction(err.error)))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
