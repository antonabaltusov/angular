import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ICourse, IAuthor, CourseClass } from '../../../shared/models';

export interface CoursesState extends EntityState<CourseClass> {
  readonly lengthBD: number;
  readonly error: Error | string | null;
  readonly loading: boolean;
  readonly loaded: boolean;
  authors: IAuthor[];
}

function selectCourseId(course: CourseClass): number {
  return course.id;
}

function sortCoursesByDate(course1: CourseClass, course2: CourseClass): number {
  return course1.date.localeCompare(course2.date);
}

export const adapter: EntityAdapter<CourseClass> =
  createEntityAdapter<CourseClass>({
    selectId: selectCourseId,
    sortComparer: sortCoursesByDate,
  });

export const initialCoursesState: CoursesState = adapter.getInitialState({
  lengthBD: 0,
  error: null,
  loading: false,
  loaded: false,
  authors: [],
});
