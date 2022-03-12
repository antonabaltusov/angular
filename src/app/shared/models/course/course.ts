import { ICourse } from './course.model';

export class CourseClass implements ICourse {
  id: number;
  title: string;
  creation: Date;
  duration: number;
  description: string;

  constructor(
    id: number,
    title: string,
    creation: Date,
    duration: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.creation = creation;
    this.duration = duration;
    this.description = description;
  }
}
