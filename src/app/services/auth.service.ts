import { Injectable } from '@angular/core';
import UserEntity from '../store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      public http: HttpClient,
      private jwtHelper: JwtHelperService,
  ) { }

  public authenticate(credentials: UserEntity) {
    return this.http.post('https://serverless.wpadilla.vercel.app/api/auth/login',
      credentials
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
