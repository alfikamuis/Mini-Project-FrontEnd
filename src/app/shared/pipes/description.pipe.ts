import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let details: string;
    if (value.length > 80) {
      details = value.substring(0,80)+(" (more...)")
    } else {
      details = value; 
    }
    return details;
  }
}
