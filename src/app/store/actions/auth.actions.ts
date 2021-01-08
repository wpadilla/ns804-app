import Action from '../models/action.model';
import UserEntity from '../models/user.model';

export enum AuthActionsType {
  LOGIN = '[LOGIN] Login Action',
  LOGIN_SUCCESS = '[LOGIN] Login Action Success',
  LOGIN_FAILURE = '[LOGIN] Login Action Failure',
}

export class LoginAction implements Action {
  readonly type = AuthActionsType.LOGIN;

}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionsType.LOGIN_SUCCESS;

  constructor(public payload: UserEntity) {}

}
export class LoginFailureAction implements Action {
  readonly type = AuthActionsType.LOGIN_FAILURE;

  constructor(public payload: Error) {}
}
