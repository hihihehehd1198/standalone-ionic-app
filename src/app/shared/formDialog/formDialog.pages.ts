import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { CustomInputDirective } from '../../directives/custom-input.directive';
import { FormLabelPipe } from '../../pipes/form-label.pipe';
import { SelectInputComponent } from '../selectInput/selectInput.page';

@Component({
  selector: 'app-form-dialog',
  templateUrl: 'formDialog.pages.html',
  styleUrls: ['formDialog.pages.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,

    FormLabelPipe,
    CustomInputDirective,
    SelectInputComponent,
  ],
})
export class FormDialogComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() formDialogParam!: FormGroup;
  @Input() listTitleInput?: any;
  @Input() dialogName?= '';
  @Input() dialogTitle?: string;
  @Input() isOpenDialog: boolean = false
  @Output() formClick!: EventEmitter<any>;

  @ViewChild('modal') formTemplate?: TemplateRef<any>;
  @Input('listFormControlName') listFormControlName?: object;
  listControlName?: string[];
  constructor() { }
  list = [1, 2, 3];

  /**
   * close dialog
   * @param e  modal name
   */
  ngOnChanges(change: SimpleChanges) {
    this.listControlName = Object.keys(this.listFormControlName!) || [];
    console.log(this.listControlName);
    // console.log(this.formDialogParam.getRawValue());
    // if (this.formDialogParam.getRawValue()) {
    //   const listFormName = this.formDialogParam.getRawValue();
    //   // console.log('list form control name : ', listFormName);
    //   this.listControlName = Object.keys(listFormName);
    // }
  }
  ngOnInit(): void { }
  resetForm(): void {
    this.formDialogParam.reset();
  }
  submitForm(): void {
    if (this.formDialogParam) {
      console.log(this.formDialogParam.getRawValue())
    }
  }
  ngAfterViewInit(): void {
    console.log(this.formTemplate);
  }
  closeModal(e: any) {
    e.dismiss();
  }
  testingDismiss() {
    console.log('testing ')
  }
}
