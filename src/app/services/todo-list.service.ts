import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TokenService from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService extends TokenService {

  constructor(
      public http: HttpClient,
  ) {
    super();
  }

  public loadTodos(): Observable<any> {
    return this.http.get('https://serverless.wpadilla.vercel.app/api/todos',
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }
}
