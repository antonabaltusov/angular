import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [AuthService]
})
export class LoginPageComponent implements OnInit {
  public inputEmail: string = '';
  public password: string = '';
 // public isAuth: boolean ;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //this.isAuth = this.authService.isAuth()
  }

  // public isAuth():boolean {
  //   return this.authService.isAuth()
  // }

  public login():void {
    if(this.inputEmail&&this.password) {
      this.authService.login(this.inputEmail, this.password);
    }
  }
}
