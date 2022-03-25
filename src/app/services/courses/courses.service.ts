import { Injectable } from '@angular/core';
import { COURSES } from '../../mocks/mock-courses';
import { ICourse } from '../../shared/models/course/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: ICourse[] = COURSES;

  constructor() {}

  getList(): ICourse[] {
    return this.courses;
  }
  createCourse(course: ICourse): Promise<ICourse> {
    let result;
    let id = -1;
    do {
      id++;
      result = this.courses.some((course) => course.id == id);
    } while (result);
    course.id = id;
    this.courses.push(course);
    return Promise.resolve(course);
  }

  getCourseById(id: number): ICourse | undefined {
    return this.courses.find((course) => course.id == id);
  }

  updateCourse(editCourse: ICourse): ICourse {
    const index = this.courses.findIndex(
      (course) => course.id == editCourse.id
    );
    if (index < 0) {
      return this.courses[index];
    }
    this.courses[index] = { ...this.courses[index], ...editCourse };
    return this.courses[index];
  }

  removeCourse(id: number): boolean {
    const index = this.courses.findIndex((course) => course.id == id);
    if (index < 0) {
      return false;
    }
    this.courses.splice(index, 1);
    console.log(`удален ${id}`);
    return true;
  }
}
