import Action from '../models/action.model';
import TodoEntity from '../models/todo.model';

export enum TodoActionsTypes {
  LOAD_TODO = '[TODO] Load Action',
  LOAD_TODO_SUCCESS = '[TODO] Load Action Success',
  LOAD_TODO_FAILURE = '[TODO] Load Action Failure',
  ADD_TODO = '[TODO] Add Todo',
  ADD_TODO_SUCCESS = '[TODO] Add Todo Success',
  ADD_TODO_FAILURE = '[TODO] Add Todo Failure',
  UPDATE_TODO = '[TODO] Add Todo',
  UPDATE_TODO_SUCCESS = '[TODO] Add Todo Success',
  UPDATE_TODO_FAILURE = '[TODO] Add Todo Failure',
  DELETE_TODO = '[TODO] Delete Todo',
  DELETE_TODO_SUCCESS = '[TODO] Delete Todo Success',
  DELETE_TODO_FAILURE = '[TODO] Delete Todo Failure'
}

export class LoadTodoAction implements Action {
  readonly type = TodoActionsTypes.LOAD_TODO;

  constructor(public payload: string) {}

}
export class LoadTodoSuccessAction implements Action {
  readonly type = TodoActionsTypes.LOAD_TODO_SUCCESS;

  constructor(public payload: TodoEntity) {}

}
export class LoadTodoFailureAction implements Action {
  readonly type = TodoActionsTypes.LOAD_TODO_FAILURE;

  constructor(public payload: Error) {}
}

/// DELETE TODO
export class DeleteTodoAction implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO;

  constructor(public payload: string) {}

}
export class DeleteTodoSuccessAction implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO_SUCCESS;

  constructor(public payload: TodoEntity) {}

}
export class DeleteTodoFailureAction implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO_FAILURE;

  constructor(public payload: Error) {}
}

/// ADD TODO
export class AddTodoAction implements Action {
  readonly type = TodoActionsTypes.ADD_TODO;

  constructor(public payload: Exclude<TodoEntity, '_id'>) {}

}
export class AddTodoSuccessAction implements Action {
  readonly type = TodoActionsTypes.ADD_TODO_SUCCESS;

  constructor(public payload: TodoEntity) {}

}
export class AddTodoFailureAction implements Action {
  readonly type = TodoActionsTypes.ADD_TODO_FAILURE;

  constructor(public payload: Error) {}
}
export type TodoActions =
  LoadTodoAction |
  LoadTodoSuccessAction |
  LoadTodoFailureAction |
  DeleteTodoAction |
  DeleteTodoSuccessAction |
  DeleteTodoFailureAction |
  AddTodoAction |
  AddTodoSuccessAction |
  AddTodoFailureAction;
