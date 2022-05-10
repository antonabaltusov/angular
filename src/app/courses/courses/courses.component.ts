import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CourseClass } from '../../shared/models';
import { CoursesFacade } from '../../core/@ngrx';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit {
  sortBy: keyof CourseClass = 'date';
  public inputForm: FormControl = this.fb.control(null);
  public coursesState$!: Observable<ReadonlyArray<CourseClass>>;
  public coursesLoading$!: Observable<boolean>;
  public coursesError$!: Observable<Error | string | null>;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private coursesFacade: CoursesFacade
  ) {}

  ngOnInit(): void {
    this.coursesState$ = this.coursesFacade.courses$;
    this.coursesLoading$ = this.coursesFacade.coursesLoading$;
    this.coursesError$ = this.coursesFacade.coursesError$;

    this.inputForm.valueChanges
      .pipe(
        filter((data) => data.length > 3 || data.length == 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((input) => this.coursesFacade.getCoursesWithQuery({ input }));

    this.breadcrumbService.set('@Courses', 'Courses');
  }

  public loadMore() {
    this.coursesFacade.getCoursesWithQuery({ input: this.inputForm.value });
  }
}
