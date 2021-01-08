import { AuthState } from '../reducers/auth.reducer';
import { TodoListState } from '../reducers/todo-list.reducer';

export default interface AppState {
  auth: AuthState;
  todoList: TodoListState;
}
