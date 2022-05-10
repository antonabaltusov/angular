import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { CoursesFacade } from '../../core/@ngrx';

@Injectable({
  providedIn: 'root',
})
export class AuthorStatePreloadingGuard implements CanActivate {
  constructor(private coursesFacade: CoursesFacade) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  checkStore(): Observable<boolean> {
    return this.coursesFacade.authorsLoaded$.pipe(
      tap((Loaded: boolean) => {
        if (!Loaded) {
          this.coursesFacade.getAllAuthors();
        }
      }),
      filter((Loaded) => !!Loaded),
      take(1)
    );
  }
}
