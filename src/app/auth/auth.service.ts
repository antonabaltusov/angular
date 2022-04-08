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

  login(email: string, password: string): Observable<any> {
    this.loadingService.changeShow(true);
    return this.http
      .post<any>(`${this.url}/login`, {
        login: email,
        password: password,
      })
      .pipe(
        tap((data) => {
          window.localStorage.setItem('token', data.token);
          this.isAuthObs.next(this.isAuth());
          this.loadingService.changeShow(false);
        }),
        catchError(() => of([this.loadingService.changeShow(false)]))
      );
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.isAuthObs.next(this.isAuth());
    this.router.navigate(['login']);
  }

  isAuth(): boolean {
    return window.localStorage.getItem('token') ? true : false;
  }

  getUserInfo(): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/userinfo`);
  }
}
