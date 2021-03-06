import { Injectable } from '@angular/core';
import UserEntity from '../store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      public http: HttpClient,
      public jwtHelper: JwtHelperService,
  ) { }

  public authenticate(credentials: UserEntity): Observable<any> {
      return this.http.post(`${environment.api}auth/login`,
        credentials
      );
  }

  public register(credentials: UserEntity): Observable<any> {
    return this.http.post(`${environment.api}auth/register`,
      credentials
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
