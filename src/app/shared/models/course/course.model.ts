import { IUser } from '../user/user.model';

export interface ICourse {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  isTopRated?: boolean;
  authors: IUser[];
}
