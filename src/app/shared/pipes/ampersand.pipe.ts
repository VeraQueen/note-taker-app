import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampersand',
  standalone: true,
})
export class AmpersandPipe implements PipeTransform {
  transform(value: string) {
    if (value.includes('&amp;')) {
      const ampersandTitle = value.replaceAll('&amp;', '&');
      return ampersandTitle;
    } else {
      return value;
    }
  }
}
