import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user/user.model';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../../../auth/auth.service';
import { USER } from '../../../mocks/mock-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public user: Observable<string> = this.authService
    .getUserInfo()
    .pipe(map((user) => user.firstName));
  public isAuth: BehaviorSubject<boolean> = this.authService.isAuthObs;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // if (this.isAuth) {
    //   this.authService.getUserInfo().subscribe({
    //     next: (user) => (this.user = user.firstName),
    //     error: (data) => console.log(data),
    //   });
    // }
  }

  public logout(): void {
    this.authService.logout();
  }
}
