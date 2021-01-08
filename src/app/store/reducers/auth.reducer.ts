import UserEntity from '../models/user.model';
import { AuthActions, AuthActionsType } from '../actions/auth.actions';

export interface AuthState {
  user?: UserEntity,
}

const initialState = { user: undefined };

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
        loading: true,
        user: action.payload,
      };
  }
};
