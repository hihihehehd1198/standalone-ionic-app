import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormControlDirective, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { interval, Observable, of, tap, timeout } from 'rxjs';

@Component({
  selector: 'app-selectInput',
  templateUrl: 'selectInput.page.html',
  styleUrls: ['selectInput.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent implements OnChanges, DoCheck {
  @Input() formControlProps?: FormControl<any>;
  @Input() listItem: Observable<string[]> = of(['1', '2', '3']);
  @Input() customClass: string = 'border-[gray] border-[1px] rounded-[10px] pl-[10px] h-[40px] w-[100%]'

  @ViewChild(FormControlDirective) thisControl!: FormControlDirective
  private cdf = inject(ChangeDetectorRef)
  // private controlContainer = inject(ControlContainer)
  // controlName?: string
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngDoCheck(): void {
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
