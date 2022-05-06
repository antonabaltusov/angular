import { Store } from '@ngrx/store';
import { AppState, selectCoursesData } from '../../core/@ngrx';
import { CourseClass } from '../../shared/models/course/course';
import * as CoursesActions from '../../core/@ngrx';
import { filter, map, Observable, take, tap } from 'rxjs';

export function checkStore(store: Store<AppState>): Observable<boolean> {
  return store.select(selectCoursesData).pipe(
    tap((courses) => {
      if (!courses.length) {
        store.dispatch(
          CoursesActions.getCourses({ start: 0, inputSearch: '' })
        );
      }
    }),
    filter((courses) => !!courses.length),
    map(() => true),
    take(1)
  );
}
