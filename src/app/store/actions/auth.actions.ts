import ActionEntity from '../models/action.model';
import UserEntity, { TokenEntity } from '../models/user.model';

export enum AuthActionsType {
  LOGIN = '[LOGIN] Login Action',
  LOGIN_SUCCESS = '[LOGIN] Login Action Success',
  LOGIN_FAILURE = '[LOGIN] Login Action Failure',
  REGISTER = '[REGISTER] Register Action',
  REGISTER_SUCCESS = '[REGISTER] Register Action Success',
  REGISTER_FAILURE = '[REGISTER] Register Action Failure',
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

export class RegisterAction implements ActionEntity {
  readonly type = AuthActionsType.REGISTER;
  constructor(public payload?: UserEntity) {}

}

export class RegisterSuccessAction implements ActionEntity {
  readonly type = AuthActionsType.REGISTER_SUCCESS;

  constructor(public payload?: UserEntity) {}

}
export class RegisterFailureAction implements ActionEntity {
  readonly type = AuthActionsType.REGISTER_FAILURE;

  constructor(public payload: Error) {}
}


export type AuthActions = LoginAction |
  LoginSuccessAction |
  LoginFailureAction |
  RegisterAction |
  RegisterSuccessAction |
  RegisterFailureAction;

