import UserEntity from '../models/user.model';
import { AuthActions, AuthActionsType } from '../actions/auth.actions';

export interface AuthState {
  token?: string;
  err?: Error;
  user?: UserEntity;
  loading?: boolean;
}

const initialState: AuthState = { token: undefined };

export const authReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionsType.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case AuthActionsType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        err: undefined
      };
    case AuthActionsType.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        payload: undefined,
        err: action.payload,
      };


    case AuthActionsType.REGISTER:
      return {
        ...state,
        loading: true,
      };
    case AuthActionsType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        err: undefined,

      };
    case AuthActionsType.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        payload: undefined,
        err: action.payload,
      };
  }
};
