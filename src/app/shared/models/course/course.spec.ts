import { CourseClass } from './course';

describe('Course', () => {
  it('should create an instance', () => {
    const date = new Date;
    expect(new CourseClass(1,'1', date, 1, '1')).toBeTruthy();
  });
});
