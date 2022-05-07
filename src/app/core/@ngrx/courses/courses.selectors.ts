import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseClass } from '../../../shared/models';
import { AppState } from '../app.state';
import { selectRouterState } from '../router';
import { CoursesState, adapter } from './courses.state';

export const selectCoursesState = createFeatureSelector<AppState, CoursesState>(
  'courses'
);

export const {
  selectEntities: selectCoursesEntities,
  selectAll: selectCoursesData,
} = adapter.getSelectors(selectCoursesState);

export const selectLengthData = createSelector(
  selectCoursesData,
  (courses: CourseClass[]) => courses.length
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
  selectCoursesEntities,
  selectRouterState,
  (courses, router): CourseClass => {
    const courseID = router.state.params['id'];
    if (courseID) {
      return courses[courseID] as CourseClass;
    } else {
      return new CourseClass();
    }
  }
);
