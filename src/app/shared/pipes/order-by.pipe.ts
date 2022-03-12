import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../models/course/course.model';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string): ICourse[] {
    if (field && field in array[0]) {
      return array.sort((a, b) =>
        a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
      );
    } else {
      return array;
    }
  }
}
