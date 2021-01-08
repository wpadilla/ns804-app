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

export const loginSuccessAction = createAction(
  AuthActionsType.LOGIN_SUCCESS,
  props<{credentials: UserEntity}>(),
);

export const LoginFailureAction = createAction(
  AuthActionsType.LOGIN_FAILURE,
  props<Error>(),
);
