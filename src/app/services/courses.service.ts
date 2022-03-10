import { Injectable } from '@angular/core';
import { COURSES } from 'src/app/mocks/mock-courses';
import { ICourse } from 'src/app/shared/models/course/course.model';


@Injectable({
  providedIn: 'root'
})
export class CoursesService{
  private courses: ICourse[] = COURSES;

  constructor() { }

  getList(): ICourse[] {
    return this.courses;
  }
  createCourse(course: ICourse):Promise<ICourse> {
    let result;
    let id = -1;
    do {
      id++
      result = this.courses.some(course => course.id == id);
    } while (result);
    course.id = id;
    this.courses.push(course)
    return Promise.resolve(course);
  }

  getCourseById(id: number):Promise<ICourse> {
    const course = this.courses.find(course => course.id == id);
    if(course) {
      return Promise.resolve(course);
    } else {
      return Promise.reject('not found');
    }
  }

  updateCourse(editCourse: ICourse):Promise<ICourse> {
    const index = this.courses.findIndex(course => course.id == editCourse.id);
    if(index<0) {
      return Promise.reject('not found');
    }
    this.courses[index] = editCourse;
    return Promise.resolve(editCourse);
  }

  removeCourse(id: number):Promise<boolean> {
    const index = this.courses.findIndex(course => course.id == id);
    if(index<0) {
      return Promise.reject('not found');
    }
    this.courses.splice(index, 1);
    return Promise.resolve(true);
  }
}
