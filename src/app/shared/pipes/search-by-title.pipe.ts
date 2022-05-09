import { Pipe, PipeTransform } from '@angular/core';
import { IAuthor } from '../models';

@Pipe({
  name: 'searchByTitle',
})
export class SearchByTitlePipe implements PipeTransform {
  transform(array: any[] | null, value: string): any[] | null {
    if (array) {
      if (value) {
        const lowerValue = value.toLocaleLowerCase();
        return array.filter((item) =>
          item.name
            .concat(item.description)
            .toLocaleLowerCase()
            .includes(lowerValue)
        );
      } else {
        return array;
      }
    } else {
      return null;
    }
  }
}
