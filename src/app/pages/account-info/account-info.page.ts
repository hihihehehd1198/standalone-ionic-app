import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/button/button.page';
import { DialogComponent } from 'src/app/shared/formDialog/formDialog.pages';
import { FormInputComponent } from 'src/app/shared/formInput/formInput.page';

@Component({
  selector: 'app-account-info',
  templateUrl: 'account-info.page.html',
  styleUrls: ['account-info.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    DialogComponent,
    ButtonComponent,
    FormInputComponent,
  ],
})
export class AccountinfoComponent {
  fb = inject(FormBuilder);
  constructor() {}
  passwordForm = this.fb.group({
    name: [null, Validators.required],
    id: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    Email: [null, Validators.required],
    accountId: [null, Validators.required],
  });
  listformControlName = {
    
  };
  sampleObjectFormControlName = {
    formControl: new FormControl(),
    inputName: 'name',
    defaultValue: '123',
    eventOnchange: () => {
      console.log('testing form input ');
    },
    type: 'text',
  };
  changePassword(e: any) {
    console.log('changePassword Work!', e);
    // console.log(this.passwordForm.value);
  }
}
