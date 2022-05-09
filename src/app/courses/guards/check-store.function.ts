import { CourseClass } from '../../shared/models/course/course';
import { filter, Observable, take, tap } from 'rxjs';
import { EntityCollectionService } from '@ngrx/data';

export function checkStore(
  courseService: EntityCollectionService<CourseClass>
): Observable<boolean> {
  return courseService.loaded$.pipe(
    tap((Loaded: boolean) => {
      if (!Loaded) {
        courseService.getWithQuery({ start: '0', count: '10', sort: 'date' });
      }
    }),
    filter((Loaded) => !!Loaded),
    take(1)
  );
}
