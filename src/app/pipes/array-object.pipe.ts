import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayObject',
  standalone: true
})
export class ArrayObjectPipe implements PipeTransform {

  transform(value: object, isLabel?: boolean): any {
    // console.log(value, typeof value)
    return isLabel ? Object.keys(value) || '' : Object.values(value) || ''

  }

}
