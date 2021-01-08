import { AuthState } from '../reducers/auth.reducer';
import TodoEntity from './todo.model';

export default interface AppState {
  auth: AuthState,
  todoList: TodoEntity[],
};
