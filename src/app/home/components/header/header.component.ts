import { Component, Input, OnInit } from '@angular/core';
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
  @Input() isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout():void {
    this.authService.logout();
    console.log(this.userName);
  }
}
