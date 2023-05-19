import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.rutaAuth;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  singin(user: any) {
   return this.http.post(`${this.URL}/login`, user);
  }

  registro(user: any) {
    return this.http.post(`${this.URL}/register`, user);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
}
