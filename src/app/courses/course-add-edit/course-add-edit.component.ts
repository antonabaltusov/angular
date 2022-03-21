import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../shared/models/course/course.model';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.sass'],
})
export class CourseAddEditComponent implements OnInit {
  @Input() editCourse: ICourse | null;
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<ICourse> = new EventEmitter<ICourse>();
  public title: string;
  public decription: string;
  public creation: Date;
  public duration: number;
  constructor(private datePipe: DatePipe) {}

  public cancel(): void {
    this.onCancel.emit(true);
  }

  public save(): void {
    console.log(this.title, this.decription, this.creation, this.duration);
  }
  ngOnInit(): void {
    if (this.editCourse) {
      console.log(this.editCourse);
      this.title = this.editCourse.title || '';
      this.duration = this.editCourse.duration;
      this.decription = this.editCourse.description || '';
      this.creation = this.editCourse.creation || new Date();
    }
    console.log(this.title, this.decription, this.creation, this.duration);
  }
}
