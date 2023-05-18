import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, Input, OnChanges, PipeTransform, SimpleChanges, ViewChild, WritableSignal } from '@angular/core';
import { ControlContainer, FormControl, FormControlDirective, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { interval, Observable, of, tap, timeout } from 'rxjs';
import { SelectInputPipe } from './selectInput.pipe';

@Component({
  selector: 'app-selectInput',
  templateUrl: 'selectInput.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, SelectInputPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent implements OnChanges, DoCheck {
  @Input() formControlProps?: FormControl<any>;
  @Input() listItem?: any[]

  @Input() customClass: string = 'border-[gray] border-[1px] rounded-[10px] pl-[10px] h-[40px] w-[100%]'


  @Input() selectViewPropView?: string;
  @Input() selectViewPropValue?: string;


  @Input() defaultValue?: any

  @ViewChild(FormControlDirective) thisControl!: FormControlDirective
  private cdf = inject(ChangeDetectorRef)
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngDoCheck(): void {
    // if (this.defaultValue && this.formControlProps) {
    //   this.formControlProps?.setValue(this.defaultValue)
    //   this.cdf.detectChanges()
    // }

    // if (this.formControlProps) {
    //   // console.log(this.formControlProps)
    //   const formGroup = this.controlContainer.control as FormGroup;
    //   const controls = formGroup?.getRawValue();
    //   const controlNames = Object.keys(controls);
    //   for (let i = 0; i < controlNames.length; i++) {
    //     if (formGroup?.controls[controlNames[i]] === this.formControlProps) {
    //       this.controlName = controlNames[i];
    //       break;
    //     }
    //   }
    //   console.log('cd render', this.controlName)
    // }

    // check form control name from dynamic input contorl name 
  }
}
