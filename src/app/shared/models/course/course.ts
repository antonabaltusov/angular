import { IUser } from '../user/user.model';
import { ICourse } from './course.model';

export class CourseClass implements ICourse {
  id?: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: IUser[];

  constructor(
    name: string,
    date: string,
    length: number,
    description: string,
    user?: IUser[],
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.length = length;
    this.description = description;
    this.authors = user || [];
  }
}
