import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionsType, LoginAction, LoginSuccessAction } from '../actions/auth.actions';
import UserEntity from '../models/user.model';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthEffect {

  authenticate = createEffect(() => this.actions$.pipe(
    ofType<LoginAction>(AuthActionsType.LOGIN),
    exhaustMap((data: LoginAction) =>
      this.loginService.authenticate(data.payload)
      .pipe(
        map((credentials: UserEntity) => (new LoginSuccessAction(credentials))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: AuthService,
    private store: Store,
  ) {}
}
