import ActionEntity from '../models/action.model';
import UserEntity, { TokenEntity } from '../models/user.model';

export enum AuthActionsType {
  LOGIN = '[LOGIN] Login Action',
  LOGIN_SUCCESS = '[LOGIN] Login Action Success',
  LOGIN_FAILURE = '[LOGIN] Login Action Failure',
}

export class LoginAction implements ActionEntity {
  readonly type = AuthActionsType.LOGIN;
  constructor(public payload?: UserEntity) {}

}

export class LoginSuccessAction implements ActionEntity {
  readonly type = AuthActionsType.LOGIN_SUCCESS;

  constructor(public payload?: TokenEntity) {}

}
export class LoginFailureAction implements ActionEntity {
  readonly type = AuthActionsType.LOGIN_FAILURE;

  constructor(public payload: Error) {}
}

export type AuthActions = LoginAction |
  LoginSuccessAction |
  LoginFailureAction;

