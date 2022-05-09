import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subscription,
} from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CourseClass, ICourse } from '../../shared/models';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit {
  public sortBy: keyof CourseClass = 'date';
  public inputForm: FormControl = this.fb.control(null);
  public coursesState$!: Observable<ReadonlyArray<CourseClass>>;
  public coursesLoading$!: Observable<boolean>;
  private countCourses: number;
  private courseService: EntityCollectionService<CourseClass>;
  public sub: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    entityServices: EntityServices
  ) {
    this.courseService = entityServices.getEntityCollectionService('Courses');
  }

  ngOnInit(): void {
    this.coursesState$ = this.courseService.entities$;
    this.coursesLoading$ = this.courseService.loading$;
    this.sub = this.courseService.count$.subscribe(
      (number) => (this.countCourses = number)
    );

    this.inputForm.valueChanges
      .pipe(
        filter((data) => data.length > 3 || data.length == 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) =>
        this.courseService.getWithQuery({
          start: `${this.countCourses}`,
          count: '10',
          textFragment: `${data}`,
          sort: this.sortBy,
        })
      );

    this.breadcrumbService.set('@Courses', 'Courses');
  }

  public loadMore() {
    this.courseService.getWithQuery({
      start: `${this.countCourses}`,
      count: '10',
      textFragment: `${this.inputForm.value ? this.inputForm.value : ''}`,
      sort: this.sortBy,
    });
  }
}
