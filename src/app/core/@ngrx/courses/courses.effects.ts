import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoursesActions from './courses.actions';
import * as RouterActions from '../router';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, Observable, of, switchMap } from 'rxjs';
import { CoursesService } from '../../../services/courses/courses.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getCourses$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getCourses, CoursesActions.loadMoreCourses),
      switchMap((action) =>
        this.coursesService.getList(action.start, action.inputSearch).pipe(
          map((data) => {
            const { courses, length } = data;
            if (action.type == '[Courses page (App)] GET_COURSES') {
              return CoursesActions.getCoursesSuccess({
                courses,
                lengthBD: length,
              });
            } else {
              return CoursesActions.loadMoreCoursesSuccess({
                newCourses: courses,
                lengthBD: length,
              });
            }
          }),
          catchError((error) => of(CoursesActions.loadMoreCoursesError(error)))
        )
      )
    )
  );

  getAuthors$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getAuthors),
      switchMap((action) =>
        this.coursesService.getAuthorsList(action.input).pipe(
          map((data) => {
            return CoursesActions.getAuthorsSuccess({ authors: data });
          }),
          catchError((error) => of(CoursesActions.getAuthorsError(error)))
        )
      )
    )
  );

  deleteCourse$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap((action) => {
        return this.coursesService.removeCourse(action.courseId).pipe(
          map(() =>
            CoursesActions.deleteCourseSuccess({ courseId: action.courseId })
          ),
          catchError((error) => of(CoursesActions.deleteCourseError(error)))
        );
      })
    )
  );

  updateCourse$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      switchMap((action) =>
        this.coursesService.updateCourse(action.course).pipe(
          map((course) => {
            return CoursesActions.updateCourseSuccess({ course });
          }),
          catchError((error) => of(CoursesActions.updateCourseError(error)))
        )
      )
    )
  );

  createCourse$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      switchMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course) => {
            return CoursesActions.createCourseSuccess({ course });
          }),
          catchError((error) => of(CoursesActions.createCourseError(error)))
        )
      )
    )
  );
  createUpdateCourses$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CoursesActions.createCourseSuccess,
        CoursesActions.updateCourseSuccess
      ),
      map((action) => RouterActions.go({ path: ['/courses'] }))
    )
  );
}
