import { IUser } from '../user/user.model';
import { ICourse } from './course.model';

export class CourseClass implements ICourse {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: IUser[];

  constructor(
    id: number = 0,
    name: string = '',
    date: string = '',
    length: number = 0,
    description: string = '',
    authors: IUser[] = []
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.length = length;
    this.description = description;
    this.authors = authors || [];
  }
}
