import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course/course.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.sass']
})
export class CoursesItemComponent implements OnInit {
  @Input() course: ICourse;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    let fakeValue= 'fakeValue';
    console.log('ngOnInit '+ fakeValue);
  }
  // ngOnChanges():void {
  //   console.log('ngOnChanges');
  // }
  // ngDoCheck():void {
  //   console.log('ngDoCheck');
  // }
  // ngAfterContentInit():void {
  //   console.log('ngAfterContentInit');
  // }
  // ngAfterContentChecked():void {
  //   console.log('ngAfterContentChecked');
  // }
  // ngAfterViewInit():void {
  //   console.log('ngAfterViewInit');
  // }
  // ngAfterViewChecked():void {
  //   console.log('ngAfterViewChecked');
  // }
  // ngOnDestroy():void {
  //   console.log('ngOnDestroy');
  //}

  public delete(): void {
    this.onDelete.emit(this.course.id);
  }

}
