import { Injectable } from '@angular/core';
import UserEntity from '../store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
      public http: HttpClient,
  ) { }

  public loadTodo(_id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/todos/${_id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
  }
}
