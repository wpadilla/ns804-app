import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
      public http: HttpClient,
  ) {
  }

  public loadTodos(): Observable<any> {
    return this.http.get(`${environment.api}todos`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }
}
