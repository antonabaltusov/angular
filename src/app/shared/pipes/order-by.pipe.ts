import { Pipe, PipeTransform } from '@angular/core';
import { CourseClass, ICourse } from '../models';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    array: readonly any[] | null,
    field: keyof ICourse
  ): ICourse[] | null {
    if (array != null) {
      const courses: ICourse[] = [...array];
      if (field != 'id' && field != 'isTopRated') {
        return courses.sort((a, b) =>
          a[field] > b[field] ? -1 : b[field] > a[field] ? 1 : 0
        );
      } else {
        return courses;
      }
    } else {
      return null;
    }
  }
}
