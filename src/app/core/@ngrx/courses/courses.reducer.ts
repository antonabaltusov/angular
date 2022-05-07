import { Action, createReducer, on } from '@ngrx/store';
import { adapter, CoursesState, initialCoursesState } from './courses.state';
import * as CoursesActions from './courses.actions';

export const reducer = createReducer(
  initialCoursesState,
  on(CoursesActions.getCoursesSuccess, (state, { courses, lengthBD }) => {
    return adapter.setAll(courses, { ...state, lengthBD });
  }),
  on(
    CoursesActions.loadMoreCoursesSuccess,
    (state, { newCourses, lengthBD }) => {
      return adapter.addMany(newCourses, { ...state, lengthBD });
    }
  ),
  on(CoursesActions.deleteCourseSuccess, (state, { courseId }) => {
    return adapter.removeOne(courseId, state);
  }),
  on(CoursesActions.getAuthorsSuccess, (state, { authors }) => {
    return { ...state, authors };
  }),
  on(
    CoursesActions.getCoursesError,
    CoursesActions.loadMoreCoursesError,
    CoursesActions.deleteCourseError,
    CoursesActions.getAuthorsError,
    CoursesActions.updateCourseError,
    CoursesActions.createCourseError,
    (state, { error }) => {
      return { ...state, error };
    }
  ),
  on(CoursesActions.updateCourseSuccess, (state, { course }) => {
    return adapter.updateOne({ id: course.id, changes: course }, state);
  }),
  on(CoursesActions.createCourseSuccess, (state, { course }) => {
    return adapter.addOne(course, state);
  })
);

export function coursesReducer(
  state: CoursesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
