import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CoursesFacade } from '../../core/@ngrx';

@Injectable({
  providedIn: 'root',
})
export class CoursesStatePreloadingGuard implements CanActivate {
  constructor(private coursesFacade: CoursesFacade) {}
  canActivate(): Observable<boolean> {
    return this.coursesFacade.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
