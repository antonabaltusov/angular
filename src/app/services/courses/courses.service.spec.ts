import { TestBed } from '@angular/core/testing';
import { COURSES } from 'src/app/mocks/mock-courses';
import { ICourse } from 'src/app/shared/models/course/course.model';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of courses', () => {
    const result = service.getList();
    expect(result).toBe(COURSES);
  });

  it('should push course to array of courses', () => {
    let length = COURSES.length;
    let course = {
      title: 't',
      creation: new Date(),
      duration: 1,
      description: 'string',
    };
    service.createCourse(course);
    //const result = service.getCourseById(length)
    expect(COURSES.length).toBe(length + 1);
  });

  it('should return course', () => {
    const result = service.getCourseById(0);
    expect(result?.id).toBe(0);
  });

  it('should return underfined', () => {
    const result = service.getCourseById(-1);
    expect(result).toBeUndefined();
  });

  it('should return course after edit', () => {
    let course = {
      id: 1,
      title: 't',
      creation: new Date(),
      duration: 1,
      description: 'string',
    };
    const result = service.updateCourse(course);
    expect(result).toEqual({
      topRated: false,
      ...course,
    });
  });

  it('should return underfined', () => {
    let course = {
      id: 99999,
      title: 't',
      creation: new Date(),
      duration: 1,
      description: 'string',
    };
    const result = service.updateCourse(course);
    expect(result).toBeUndefined();
  });

  it('should return true', () => {
    const result = service.removeCourse(2);
    expect(result).toBeTruthy();
  });

  it('should return false', () => {
    const result = service.removeCourse(999999999);
    expect(result).toBeFalsy();
  });
});
