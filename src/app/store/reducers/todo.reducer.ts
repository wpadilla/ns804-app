import TodoEntity from '../models/todo.model';
import { TodoActions, TodoActionsTypes } from '../actions/todo.actions';

export interface TodoState {
  data?: TodoEntity;
  err?: Error;
  loading?: boolean;
}

const initialState: TodoState = { data: undefined };

export const todoReducer = (state: TodoState = initialState, action: TodoActions) => {
  switch (action.type) {
    case TodoActionsTypes.LOAD_TODO:
      return {
        ...state,
        loading: true,
      };
    case TodoActionsTypes.LOAD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case TodoActionsTypes.LOAD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        payload: undefined,
        err: action.payload,
      };

  }
};
