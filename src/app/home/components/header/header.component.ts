import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { USER } from '../../../mocks/mock-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  public userName: string = USER.firstName;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public isAuth():boolean {
    return this.authService.isAuth()
  }

  public logout():void {
    const userName = this.authService.getUserInfo();
    this.authService.logout();
    console.log(userName);
  }
}
