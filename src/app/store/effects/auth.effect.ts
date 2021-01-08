import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionsType, LoginAction, LoginSuccessAction } from '../actions/auth.actions';
import { TokenEntity } from '../models/user.model';


@Injectable()
export class AuthEffect {

  authenticate = createEffect(() => this.actions$.pipe(
    ofType<LoginAction>(AuthActionsType.LOGIN),
    exhaustMap((data: LoginAction) =>
      this.loginService.authenticate(data.payload)
      .pipe(
        map((res: TokenEntity) => {
          localStorage.setItem('token', res.token);
          return new LoginSuccessAction(res);
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: AuthService,
  ) {}
}
