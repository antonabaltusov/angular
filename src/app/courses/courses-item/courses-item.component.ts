import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICourse } from '../../shared/models/course/course.model';
import { CoursesFacade } from '../../core/@ngrx';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesItemComponent implements OnInit {
  @Input() course!: ICourse;

  constructor(private coursesFacade: CoursesFacade) {}

  ngOnInit(): void {}

  public delete(): void {
    if (confirm('Do you really want to delete this course')) {
      this.coursesFacade.deleteCourse(this.course);
    }
  }

  public edit(): void {
    this.coursesFacade.goTo({ path: ['edit/', this.course.id] });
  }
}
