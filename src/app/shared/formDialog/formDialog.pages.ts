import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dialog',
  templateUrl: 'formDialog.pages.html',
  styleUrls: ['formDialog.pages.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class DialogComponent implements OnChanges, OnInit {
  @Input() formDialogParam!: FormGroup;
  @Input() listTitleInput?: string[] = ['1', '2', '3'];
  @Input() dialogName? = 'changePasswordDialog';
  @Input() dialogTitle?: string;
  @Output() formClick!: EventEmitter<any>;

  listFormControlName: string[] = [];
  constructor() {}
  list = [1, 2, 3];

  /**
   * close dialog
   * @param e  modal name
   */
  ngOnChanges(change: SimpleChanges) {
    // console.log(this.formDialogParam.getRawValue());
  }
  ngOnInit(): void {
    if (this.formDialogParam.getRawValue()) {
      const listFormName = this.formDialogParam.getRawValue();
      console.log('list form control name : ', listFormName);
      this.listFormControlName = Object.keys(listFormName);
    }
  }
  closeModal(e: any) {
    e.dismiss();
  }
}
