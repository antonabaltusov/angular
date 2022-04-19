import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
})
export class LoginPageComponent implements OnDestroy {
  public form: FormGroup;
  public inputEmail: string = '';
  public password: string = '';
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  public async login(): Promise<void> {
    this.subscription = this.authService
      .login(this.form.value)
      .subscribe(() => {
        this.router.navigate(['courses']);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
