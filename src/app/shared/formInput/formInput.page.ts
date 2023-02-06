import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormControlName,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface formInputControl {
  formControl: FormControl;
  inputName: string;
  defaultValue: string;
  type: string;
  eventOnchange: any;
}
@Component({
  selector: 'app-formInput',
  templateUrl: 'formInput.page.html',
  styleUrls: ['formInput.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormInputComponent {
  @Input() formControlName?: formInputControl;
  constructor() {}
}
