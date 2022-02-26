import { Component, OnInit } from '@angular/core';
import { USER } from '../../../mocks/mock-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public userName: string = USER.firstName;

  constructor() { }

  ngOnInit(): void {
  }

}
