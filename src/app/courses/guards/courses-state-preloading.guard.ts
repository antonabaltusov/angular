import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { checkStore } from './check-store.function';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { CourseClass } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CoursesStatePreloadingGuard implements CanActivate {
  private courseService: EntityCollectionService<CourseClass>;
  constructor(entityServices: EntityServices) {
    this.courseService = entityServices.getEntityCollectionService('Courses');
  }
  canActivate(): Observable<boolean> {
    return checkStore(this.courseService).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
