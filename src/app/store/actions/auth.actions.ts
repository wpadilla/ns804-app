import Action from '../models/action.model';
import UserEntity from '../models/user.model';
import { createAction, props } from '@ngrx/store';

export enum AuthActionsType {
  LOGIN = '[LOGIN] Login Action',
  LOGIN_SUCCESS = '[LOGIN] Login Action Success',
  LOGIN_FAILURE = '[LOGIN] Login Action Failure',
}

export const loginAction = createAction(
  AuthActionsType.LOGIN,
  props<{credentials: UserEntity}>(),
);

export class LoginAction implements Action {
  readonly type = AuthActionsType.LOGIN;

  constructor(public payload: UserEntity) {}

}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionsType.LOGIN_SUCCESS;

  constructor(public payload: UserEntity) {}

}
export class LoginFailureAction implements Action {
  readonly type = AuthActionsType.LOGIN_FAILURE;

  constructor(public payload: Error) {}
}
