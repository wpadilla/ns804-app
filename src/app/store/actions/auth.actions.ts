import ActionEntity from '../models/action.model';
import UserEntity from '../models/user.model';
import { createAction, props } from '@ngrx/store';

export enum AuthActionsType {
  LOGIN = '[LOGIN] Login Action',
  LOGIN_SUCCESS = '[LOGIN] Login Action Success',
  LOGIN_FAILURE = '[LOGIN] Login Action Failure',
}

export const loginAction = createAction(
  AuthActionsType.LOGIN,
  props<UserEntity>(),
);

export class LoginAction implements ActionEntity {
  readonly type = AuthActionsType.LOGIN;
}

export class LoginSuccessAction implements ActionEntity {
  readonly type = AuthActionsType.LOGIN_SUCCESS;

  constructor(public payload: UserEntity) {}

}
export class LoginFailureAction implements ActionEntity {
  readonly type = AuthActionsType.LOGIN_FAILURE;

  constructor(public payload: Error) {}
}

export type AuthActions = LoginAction |
  LoginSuccessAction |
  LoginFailureAction;

