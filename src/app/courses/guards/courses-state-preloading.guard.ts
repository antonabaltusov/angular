import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/@ngrx';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { checkStore } from './check-store.function';

@Injectable({
  providedIn: 'root',
})
export class CoursesStatePreloadingGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(): Observable<boolean> {
    return checkStore(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
