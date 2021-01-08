import { Injectable } from '@angular/core';
import UserEntity from '../../store/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  public authenticate(credentials: UserEntity) {
    return this.http.post('https://serverless.wpadilla.vercel.app/api/auth/login',
      JSON.stringify(credentials)
    );
  }
}
