import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ICourse } from '../../shared/models/course/course.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesItemComponent implements OnInit {
  @Input() course: ICourse;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    let fakeValue = 'fakeValue';
    console.log('ngOnInit ' + fakeValue);
  }

  public delete(): void {
    this.onDelete.emit(this.course.id);
  }

  public edit(): void {
    this.onEdit.emit(this.course.id);
  }
}
