import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(min: number): unknown {
    if(min/60<1){
      return min+'min'
    }else {
      return `${Math.round(min/60)}h ${min%60}min`
    }
    return null;
  }

}
