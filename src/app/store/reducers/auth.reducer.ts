import UserEntity from '../models/user.model';
import { AuthActions, AuthActionsType } from '../actions/auth.actions';

export interface AuthState {
  user: UserEntity,
}

const initialState = { user: undefined };

export function authReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionsType.LOGIN:
      return {
        ...state,

      }
  }
};
