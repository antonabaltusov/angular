import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IUser } from '../shared/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3004/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/login`, {
        login: email,
        password: password,
      })
      .pipe(tap((data) => window.localStorage.setItem('token', data.token)));
  }

  logout(): boolean {
    window.localStorage.removeItem('token');
    return !this.isAuth();
  }

  isAuth(): boolean {
    if (window.localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo(): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/userinfo`);
  }
}
