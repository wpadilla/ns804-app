import { AuthState } from '../reducers/auth.reducer';
import { TodoListState } from '../reducers/todo-list.reducer';
import { TodoState } from '../reducers/todo.reducer';

export default interface AppState {
  auth: AuthState;
  todoList: TodoListState;
  todo: TodoState;
}
