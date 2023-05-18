import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectInputPipe',
  standalone: true
})
export class SelectInputPipe implements PipeTransform {

  transform(value: any, viewOption?: string): string | number {
    console.log(value)
    return viewOption ? value[viewOption] : value;
  }

}
