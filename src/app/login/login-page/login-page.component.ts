import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [AuthService],
})
export class LoginPageComponent {
  public inputEmail: string = '';
  public password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public async login(): Promise<void> {
    if (this.inputEmail && this.password) {
      this.authService.login(this.inputEmail, this.password).subscribe(() => {
        this.router.navigate(['courses']);
      });
    }
  }
}
