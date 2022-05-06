import { ICourse, IAuthor } from '../../../shared/models';

export interface CoursesState {
  courses: ReadonlyArray<ICourse>;
  readonly lengthBD: number;
  readonly error: Error | string | null;
  readonly loading: boolean;
  readonly loaded: boolean;
  authors: IAuthor[];
}

export const initialCoursesState: CoursesState = {
  courses: [],
  lengthBD: 0,
  error: null,
  loading: false,
  loaded: false,
  authors: [],
};
