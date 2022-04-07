import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [AuthService],
})
export class LoginPageComponent implements OnDestroy {
  public inputEmail: string = '';
  public password: string = '';
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  public async login(): Promise<void> {
    if (this.inputEmail && this.password) {
      this.subscription = this.authService
        .login(this.inputEmail, this.password)
        .subscribe(() => {
          this.router.navigate(['courses']);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
