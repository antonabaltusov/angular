import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseClass } from '../../../shared/models';
import { AppState } from '../app.state';
import { selectRouterState } from '../router';
import { CoursesState } from './courses.state';

export const selectCoursesState = createFeatureSelector<AppState, CoursesState>(
  'courses'
);

export const selectCoursesData = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses
);
export const selectLengthData = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses.length
);
export const selectLengthDataBD = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.lengthBD
);
export const selectCoursesAuthors = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.authors
);

export const selectSelectedCourseByUrl = createSelector(
  selectCoursesData,
  selectRouterState,
  (courses, router): CourseClass => {
    const courseID = router.state.params['id'];
    if (courseID && Array.isArray(courses)) {
      return courses.find((course) => course.id === +courseID);
    } else {
      return new CourseClass();
    }
  }
);

export const selectAuthorsByInput = (input?: string) =>
  createSelector(selectCoursesAuthors, (authors) => {
    if (!!input) {
      return authors.filter(
        (author) => author.name.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    } else {
      return authors;
    }
  });
