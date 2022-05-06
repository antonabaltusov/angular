import { Action, createReducer, on } from '@ngrx/store';
import { CoursesState, initialCoursesState } from './courses.state';
import * as CoursesActions from './courses.actions';

export const reducer = createReducer(
  initialCoursesState,
  on(CoursesActions.getCoursesSuccess, (state, { courses, lengthBD }) => {
    return { ...state, courses, lengthBD };
  }),
  on(
    CoursesActions.loadMoreCoursesSuccess,
    (state, { newCourses, lengthBD }) => {
      return { ...state, courses: [...state.courses, ...newCourses], lengthBD };
    }
  ),
  on(CoursesActions.deleteCourseSuccess, (state, { courseId }) => {
    const courses = state.courses.filter((course) => course.id != courseId);
    return { ...state, courses };
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
    const courses = state.courses.map((_course) => {
      if (_course.id == course.id) {
        return course;
      } else {
        return _course;
      }
    });
    console.log(course);

    return { ...state, courses };
  }),
  on(CoursesActions.createCourseSuccess, (state, { course }) => {
    const courses = [...state.courses, course];
    return { ...state, courses };
  })
);

export function coursesReducer(
  state: CoursesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
