import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import * as RouterActions from '../../core/@ngrx/router';
import * as CoursesActions from '../../core/@ngrx/courses';
import { Store } from '@ngrx/store';
import { AppState, selectCoursesData } from '../../core/@ngrx';
import { CourseClass } from '../../shared/models';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { checkStore } from './check-store.function';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class CourseExistsGuard implements CanActivate {
  private courseService: EntityCollectionService<CourseClass>;
  constructor(entityServices: EntityServices, private store: Store<AppState>) {
    this.courseService = entityServices.getEntityCollectionService('Courses');
  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return checkStore(this.courseService).pipe(
      switchMap(() => {
        const id = +route.paramMap.get('id')!;
        return this.hasCourse(id);
      }),
      catchError(() => of(false))
    );
  }

  private hasCourse(id: number): Observable<boolean> {
    return this.courseService.entities$.pipe(
      map(
        (courses: CourseClass[]) => !!courses.find((course) => course.id === id)
      ),
      tap((result) => {
        if (!result) {
          this.store.dispatch(RouterActions.go({ path: ['/courses'] }));
        }
      }),
      take(1)
    );
  }
}
