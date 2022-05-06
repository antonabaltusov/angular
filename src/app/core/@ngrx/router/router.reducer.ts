import { RouterState } from './router.state';
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

export const routerReducers: ActionReducerMap<RouterState> = {
  router: routerReducer,
};
