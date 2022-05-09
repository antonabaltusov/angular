import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICourse } from '../../shared/models/course/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/@ngrx';
import * as RouterActions from '../../core/@ngrx/router/router.actions';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { CourseClass } from '../../shared/models';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesItemComponent implements OnInit {
  @Input() course!: ICourse;
  private courseService: EntityCollectionService<CourseClass>;

  constructor(private store: Store<AppState>, entityServices: EntityServices) {
    this.courseService = entityServices.getEntityCollectionService('Courses');
  }

  ngOnInit(): void {}

  public delete(): void {
    if (confirm('Do you really want to delete this course')) {
      this.courseService.delete(this.course);
    }
  }

  public edit(): void {
    this.store.dispatch(RouterActions.go({ path: ['edit/', this.course.id] }));
  }
}
