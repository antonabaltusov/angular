import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService],
})
export class AppComponent implements DoCheck {
  title = 'angular-run';
  public isAuth: boolean = this.authService.isAuth();

  constructor(private authService: AuthService) {}

  ngDoCheck() {
    this.isAuth = this.authService.isAuth();
  }
}
