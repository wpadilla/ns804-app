import { Injectable } from '@angular/core';
import UserEntity from '../store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import TokenService from './token.service';
import TodoEntity from '../store/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends TokenService{

  constructor(
      public http: HttpClient,
  ) {
    super();
  }

  public loadTodo(_id: string): Observable<any> {
    return this.http.get(`https://serverless.wpadilla.vercel.app/api/todos/${_id}`,
      {
        headers: {
          Authorization: this.token,
        }
      });
  }

  public deleteTodo(_id: string): Observable<any> {
    return this.http.delete(`https://serverless.wpadilla.vercel.app/api/todos/${_id}`,
      {
        headers: {
          Authorization: this.token,
        }
      });
  }

  public updateTodo(todo: { id: string, data: Omit<TodoEntity, '_id'> }): Observable<any> {
    return this.http.put(`https://serverless.wpadilla.vercel.app/api/todos/${todo.id}`,
      todo.data,
      {
        headers: {
          Authorization: this.token,
        }
      });
  }

  public addTodo(todo: Omit<TodoEntity, '_id'>): Observable<any> {
    return this.http.post(`https://serverless.wpadilla.vercel.app/api/todos/`, todo,
      {
        headers: {
          Authorization: this.token,
        }
      });
  }
}
