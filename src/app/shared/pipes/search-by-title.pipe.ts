import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../models/course/course.model';

@Pipe({
  name: 'searchByTitle'
})
export class SearchByTitlePipe implements PipeTransform {

  transform(courses: ICourse[], value: string): ICourse[] {
      const lowerValue = value.toLocaleLowerCase();
      return courses.filter(course => course.title.toLocaleLowerCase().includes(lowerValue));
  }
}
