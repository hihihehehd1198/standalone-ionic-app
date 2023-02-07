import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formLabel',
  standalone: true,
})
export class FormLabelPipe implements PipeTransform {
  transform(value: any, listControl: any, formName?: string): string {
    console.log('formName:"', formName);
    const index = value;
    console.log('listcontrol', listControl);
    return listControl[`${value}`] as string;
  }
}
