import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { IAuthor } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthorStatePreloadingGuard implements CanActivate {
  private authorService: EntityCollectionService<IAuthor>;
  constructor(entityServices: EntityServices) {
    this.authorService = entityServices.getEntityCollectionService('Authors');
  }
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  checkStore(): Observable<boolean> {
    return this.authorService.loaded$.pipe(
      tap((Loaded: boolean) => {
        if (!Loaded) {
          this.authorService.getAll();
        }
      }),
      filter((Loaded) => !!Loaded),
      take(1)
    );
  }
}
