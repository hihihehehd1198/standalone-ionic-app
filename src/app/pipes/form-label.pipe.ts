import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formLabel',
  standalone: true
})
export class FormLabelPipe implements PipeTransform {

  transform(value: any, listControl: any): string {
    const index = value
    console.log('listcontrol', listControl)
    return listControl[`${value}`] as string
  }

}
