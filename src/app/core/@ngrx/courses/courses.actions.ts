import { createAction, props } from '@ngrx/store';
import { ICourse, IAuthor, CourseClass } from '../../../shared/models';

export const getCourses = createAction(
  '[Courses page (App)] GET_COURSES',
  props<{ start: number; inputSearch: string }>()
);
export const getCoursesSuccess = createAction(
  '[Courses form Effect] GET_COURSES_SUCCESS',
  props<{ courses: CourseClass[]; lengthBD: number }>()
);
export const getCoursesError = createAction(
  '[Courses form Effect] GET_COURSES_ERROR',
  props<{ error: Error | string | null }>()
);

export const loadMoreCourses = createAction(
  '[Courses page (App)] LOAD_MORE_COURSES',
  props<{ inputSearch: string; start: number }>()
);
export const loadMoreCoursesSuccess = createAction(
  '[Courses form Effect] LOAD_MORE_COURSES_SUCCESS',
  props<{ newCourses: CourseClass[]; lengthBD: number }>()
);
export const loadMoreCoursesError = createAction(
  '[Courses form Effect] LOAD_MORE_COURSES_ERROR',
  props<{ error: Error | string | null }>()
);

export const getCourse = createAction(
  '[Course form page] GET_COURSE',
  props<{ courseId: number }>()
);

export const createCourse = createAction(
  '[Course form page] CREATE_COURSE',
  props<{ course: ICourse }>()
);
export const createCourseSuccess = createAction(
  '[Course form Effect] CREATE_COURSE_SUCCESS',
  props<{ course: ICourse }>()
);
export const createCourseError = createAction(
  '[Course form Effect] CREATE_COURSE_ERROR',
  props<{ error: Error | string | null }>()
);

export const updateCourse = createAction(
  '[Course form Page] UPDATE_COURSE',
  props<{ course: ICourse }>()
);
export const updateCourseSuccess = createAction(
  '[Course form Effect] UPDATE_COURSE_SUCCESS',
  props<{ course: ICourse }>()
);
export const updateCourseError = createAction(
  '[Course form Effect] UPDATE_COURSE_ERROR',
  props<{ error: Error | string | null }>()
);

export const deleteCourse = createAction(
  '[Course form page] DELETE_COURSE',
  props<{ courseId: number }>()
);
export const deleteCourseSuccess = createAction(
  '[Course form Effect] DELETE_COURSE_SUCCESS',
  props<{ courseId: number }>()
);
export const deleteCourseError = createAction(
  '[Course form Effect] DELETE_COURSE_ERROR',
  props<{ error: Error | string | null }>()
);
export const getAuthors = createAction(
  '[Courses page (App)] GET_AUTHORS',
  props<{ input?: string }>()
);
export const getAuthorsSuccess = createAction(
  '[Courses form Effect] GET_AUTHORS_SUCCESS',
  props<{ authors: IAuthor[] }>()
);
export const getAuthorsError = createAction(
  '[Courses form Effect] GET_AUTHORS_ERROR',
  props<{ error: Error | string | null }>()
);
