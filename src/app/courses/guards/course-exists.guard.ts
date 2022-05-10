import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { CoursesFacade } from '../../core/@ngrx';
import { CourseClass } from '../../shared/models';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { CoursesStatePreloadingGuard } from './courses-state-preloading.guard';

@Injectable({
  providedIn: 'root',
})
export class CourseExistsGuard implements CanActivate {
  constructor(private coursesFacade: CoursesFacade) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.coursesFacade.checkStore().pipe(
      switchMap(() => {
        const id = +route.paramMap.get('id')!;
        return this.hasCourse(id);
      }),
      catchError(() => of(false))
    );
  }

  private hasCourse(id: number): Observable<boolean> {
    return this.coursesFacade.courses$.pipe(
      map(
        (courses: CourseClass[]) => !!courses.find((course) => course.id === id)
      ),
      tap((result) => {
        if (!result) {
          this.coursesFacade.goTo({ path: ['/courses'] });
        }
      }),
      take(1)
    );
  }
}
