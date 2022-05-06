import { RouterState } from './router';
import { CoursesState } from './courses';

export interface AppState {
  courses: CoursesState;
  router: RouterState;
}
