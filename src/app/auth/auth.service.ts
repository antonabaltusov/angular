import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { USER } from '../mocks/mock-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): boolean {
    window.localStorage.setItem('user', USER.firstName);
    return this.isAuth();
  }

  logout(): boolean {
    window.localStorage.removeItem('user');
    return !this.isAuth();
  }

  isAuth(): boolean {
    if (window.localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo(): string | null {
    return window.localStorage.getItem('user');
  }
}
