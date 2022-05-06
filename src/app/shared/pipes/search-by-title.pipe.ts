import { Pipe, PipeTransform } from '@angular/core';
import { IAuthor } from '../models';

@Pipe({
  name: 'searchByTitle',
})
export class SearchByTitlePipe implements PipeTransform {
  transform(authors: IAuthor[], value: string): IAuthor[] {
    if (value) {
      const lowerValue = value.toLocaleLowerCase();
      return authors.filter((author) =>
        author.name.toLocaleLowerCase().includes(lowerValue)
      );
    } else {
      return authors;
    }
  }
}
