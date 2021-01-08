import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionsType, LoginAction, LoginFailureAction, LoginSuccessAction } from '../actions/auth.actions';
import { TokenEntity } from '../models/user.model';


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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
