import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectCoursesData,
  selectLengthDataBD,
} from '../../core/@ngrx';
import * as CoursesActions from '../../core/@ngrx';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  tap,
} from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CoursesService } from '../../services/courses/courses.service';
import { CourseClass, ICourse } from '../../shared/models';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [CoursesService],
})
export class CoursesComponent implements OnInit {
  public sortBy: keyof ICourse = 'date';
  public inputForm: FormControl = this.fb.control(null);
  public coursesState$!: Observable<ReadonlyArray<CourseClass>>;
  public lenghtBD$!: Observable<number>;
  public lenghtArrayCourses: number;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.coursesState$ = this.store
      .select(selectCoursesData)
      .pipe(tap((courses) => (this.lenghtArrayCourses = courses.length)));
    this.lenghtBD$ = this.store.select(selectLengthDataBD);
    //this.getCourses();

    this.inputForm.valueChanges
      .pipe(
        filter((data) => data.length > 3 || data.length == 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) => this.getCourses(data));

    this.breadcrumbService.set('@Courses', 'Courses');
  }
  public getCourses(input?: string) {
    this.store.dispatch(
      CoursesActions.getCourses({
        start: 0,
        inputSearch: input ? input : this.inputForm.value,
      })
    );
  }

  public delete(courseId: number) {
    if (confirm('Do you really want to delete this course')) {
      this.store.dispatch(CoursesActions.deleteCourse({ courseId }));
    }
  }
  public loadMore() {
    this.store.dispatch(
      CoursesActions.loadMoreCourses({
        start: this.lenghtArrayCourses,
        inputSearch: this.inputForm.value,
      })
    );
  }
}
