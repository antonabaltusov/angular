import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user/user.model';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../../../auth/auth.service';
import { USER } from '../../../mocks/mock-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  public user: string;
  public isAuth: boolean = this.authService.isAuth();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.isAuth) {
      this.authService.getUserInfo().subscribe({
        next: (user) => {
          this.user = user.firstName;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }

  public logout(): void {
    if (this.authService.logout()) {
      this.router.navigate(['login']);
    }
  }
}
