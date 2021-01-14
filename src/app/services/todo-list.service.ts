import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
      public http: HttpClient,
  ) {
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
