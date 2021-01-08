import TodoEntity from '../models/todo.model';
import { TodoListActions, TodoListActionTypes } from '../actions/todoList.actions';

export interface TodoListState {
  data: TodoEntity[];
  err?: Error;
  loading?: boolean;
}

const initialState: TodoListState = { data: [] };

export const todoListReducer = (state: TodoListState = initialState, action: TodoListActions) => {
  switch (action.type) {
    case TodoListActionTypes.LOAD_TODO_LIST:
      return {
        ...state,
        loading: true,
      };
    case TodoListActionTypes.LOAD_TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case TodoListActionTypes.LOAD_TODO_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        payload: undefined,
        err: action.payload,
      };
  }
};
