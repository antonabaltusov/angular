import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [AuthService],
})
export class LoginPageComponent {
  public inputEmail: string = '';
  public password: string = '';

  constructor(private authService: AuthService) {}

  public login(): void {
    if (this.inputEmail && this.password) {
      this.authService.login(this.inputEmail, this.password);
    }
  }
}
