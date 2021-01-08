import Action from '../models/action.model';
import TodoEntity from '../models/todo.model';

export enum TodoListActionTypes {
  LOAD_TODO_LIST = '[TODO LIST] Load Todo List Action',
  LOAD_TODO_LIST_SUCCESS = '[TODO LIST] Load Todo List Action Success',
  LOAD_TODO_LIST_FAILURE = '[TODO LIST] Load Todo List Action Failure',
}


export class LoadTodoListAction implements Action {
  readonly type = TodoListActionTypes.LOAD_TODO_LIST;

}
export class LoadTodoListSuccessAction implements Action {
  readonly type = TodoListActionTypes.LOAD_TODO_LIST_SUCCESS;

  constructor(public payload: TodoEntity[]) {}

}
export class LoadTodoListFailureAction implements Action {
  readonly type = TodoListActionTypes.LOAD_TODO_LIST_FAILURE;

  constructor(public payload: Error) {}
}

export type TodoListActions =
  LoadTodoListAction |
  LoadTodoListSuccessAction |
  LoadTodoListFailureAction;
