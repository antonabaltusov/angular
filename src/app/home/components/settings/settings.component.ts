import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input() public sortActive: boolean;
  public inputValue: string = '';

  constructor() { }

  public search():void {
    this.onSearch.emit(this.inputValue);
  }

  ngOnInit(): void {
  }

  sort(check:boolean): void {
    console.log(check);

    console.log(this.sortActive)
    //this.sortActive ? console.log(this.sortActive):console.log(this.sortActive);
  }
}
