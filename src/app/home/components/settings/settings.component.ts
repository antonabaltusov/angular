import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  public inputValue: string = '';

  constructor() { }

  public search():void {
    console.log(this.inputValue);
  }

  ngOnInit(): void {
  }

}
