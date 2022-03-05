import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { USER } from '../mocks/mock-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName: string = '';
  private userTocen: Token;

  constructor() { }

  login(email: string, password: string):void {
    window.localStorage.setItem('user',USER.firstName)
    // this.userTocen = new Token(1,1,1,1,'user');
  }

  logout():void {
    return window.localStorage.removeItem('user')
  }

  isAuth():boolean {
    if (window.localStorage.getItem('user')) {
      return true;
    }else {
      return false;
    }
  }

  getUserInfo():string|null {
    return window.localStorage.getItem('user')
  }
}
// 1.	Login (stores fake user info and token to local storage)
// 2.	Logout (wipes fake user info and token from local storage)
// 3.	IsAuthenticated (boolean)
// 4.	GetUserInfo (returns user login)
