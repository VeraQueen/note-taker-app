// Angular core libraries
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apostrophe',
  standalone: true,
})
export class ApostrophePipe implements PipeTransform {
  transform(value: string) {
    if (value.includes('&#39;')) {
      const apostopheTitle = value.replaceAll('&#39;', "'");
      return apostopheTitle;
    } else {
      return value;
    }
  }
}
