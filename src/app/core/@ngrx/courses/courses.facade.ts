import { Injectable, OnInit } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { CourseClass, IAuthor } from '../../../shared/models';
import { filter, map, Observable, Subscription, take, tap } from 'rxjs';
import { AppState } from '../app.state';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';
import { selectSelectedCourseByUrl } from '../data/entity-store.module';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  courses$: Observable<CourseClass[]> | Store<CourseClass[]>;
  coursesLoading$: Observable<boolean>;
  coursesLoaded$: Observable<boolean>;
  coursesError$: Observable<Error | string | null>;
  authors$: Observable<ReadonlyArray<IAuthor>>;
  authorsLoaded$: Observable<boolean>;
  authorsError$: Observable<Error | string | null>;
  selectedCoursesByUrl$: Observable<CourseClass>;
  private courseService: EntityCollectionService<CourseClass>;
  private authorService: EntityCollectionService<IAuthor>;
  private countCourses: number;
  sub: Subscription;
  sortBy: keyof CourseClass = 'date';

  constructor(private store: Store<AppState>, entityServices: EntityServices) {
    this.courseService = entityServices.getEntityCollectionService('Courses');
    this.authorService = entityServices.getEntityCollectionService('Authors');
    this.courses$ = this.courseService.entities$;
    this.coursesLoading$ = this.courseService.loading$;
    this.coursesLoaded$ = this.courseService.loaded$;
    this.coursesError$ = this.courseService.errors$.pipe(
      map((action) => action.payload.data.error.error.message)
    );
    this.authors$ = this.authorService.entities$;
    this.authorsLoaded$ = this.authorService.loaded$;
    this.authorsError$ = this.authorService.errors$.pipe(
      map((action) => action.payload.data.error.error.message)
    );
    this.sub = this.courseService.count$.subscribe(
      (number) => (this.countCourses = number)
    );
    this.selectedCoursesByUrl$ = this.store.select(selectSelectedCourseByUrl);
  }

  getCoursesWithQuery(props?: { input?: string; sortBy?: keyof CourseClass }) {
    this.courseService.getWithQuery({
      start: `${this.countCourses}`,
      count: '10',
      textFragment: `${props?.input ? props.input : ''}`,
      sort: props?.sortBy ? props.sortBy : this.sortBy,
    });
  }
  getAllAuthors() {
    this.authorService.getAll();
  }

  createCourse(course: CourseClass) {
    this.courseService.add(course);
  }

  updateCourse(course: CourseClass) {
    this.courseService.update(course);
  }

  deleteCourse(course: CourseClass) {
    this.courseService.delete(course);
  }

  checkStore(): Observable<boolean> {
    return this.courseService.loaded$.pipe(
      tap((Loaded: boolean) => {
        if (!Loaded) {
          this.getCoursesWithQuery();
        }
      }),
      filter((Loaded) => !!Loaded),
      take(1)
    );
  }

  goTo(props: {
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }) {
    this.store.dispatch(RouterActions.go(props));
  }
}
