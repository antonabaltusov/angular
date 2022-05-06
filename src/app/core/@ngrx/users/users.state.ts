import { UserClass } from '../../../shared/models/user/user';

export interface UsersState {
  entities: Readonly<{ [id: number]: UserClass }>;
  originalUser: Readonly<UserClass> | null;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string | null;
}

export const initialUsersState: UsersState = {
  entities: {},
  originalUser: null,
  loading: false,
  loaded: false,
  error: null,
};
