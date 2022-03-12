import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { USER } from '../../mocks/mock-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): void {
    window.localStorage.setItem('user', USER.firstName);
  }

  logout(): void {
    window.localStorage.removeItem('user');
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
