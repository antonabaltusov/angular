import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  retry,
  tap,
} from 'rxjs';
import { IUser } from '../shared/models/user/user.model';

interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3004/auth';
  public isAuthObs = new BehaviorSubject<boolean>(this.isAuth());

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  login(loginForm: LoginForm): Observable<any> {
    this.loadingService.changeShow(true);
    return this.http
      .post<any>(`${this.url}/login`, {
        login: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        tap((data) => {
          localStorage.setItem('token', data.token);
          this.isAuthObs.next(this.isAuth());
          this.loadingService.changeShow(false);
        }),
        catchError(() => of([this.loadingService.changeShow(false)]))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthObs.next(this.isAuth());
    this.router.navigate(['login']);
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/userinfo`);
  }
}
