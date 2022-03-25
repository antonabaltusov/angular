import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { USER } from '../../../mocks/mock-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  public userName: string = USER.firstName;
  public isAuth: boolean = this.authService.isAuth();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public logout(): void {
    if (this.authService.logout()) {
      this.router.navigate(['login']);
    }
  }
}
