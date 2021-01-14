import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TodoEntity from '../store/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
      public http: HttpClient,
  ) {
  }

  public loadTodo(_id: string): Observable<any> {
    return this.http.get(`https://serverless.wpadilla.vercel.app/api/todos/${_id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }

  public deleteTodo(_id: string): Observable<any> {
    return this.http.delete(`https://serverless.wpadilla.vercel.app/api/todos/${_id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }

  public updateTodo(todo: { id: string, data: Omit<TodoEntity, '_id'> }): Observable<any> {
    return this.http.put(`https://serverless.wpadilla.vercel.app/api/todos/${todo.id}`,
      todo.data,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }

  public addTodo(todo: Omit<TodoEntity, '_id'>): Observable<any> {
    return this.http.post(`https://serverless.wpadilla.vercel.app/api/todos/`, todo,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }
}
