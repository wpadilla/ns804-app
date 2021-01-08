import { Injectable } from '@angular/core';
import UserEntity from '../store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
      public http: HttpClient,
  ) { }

  public loadTodos(): Observable<any> {
    return this.http.get('http://localhost:3000/api/todos',
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }
}
