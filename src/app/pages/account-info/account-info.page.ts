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
// import { FormInputComponent } from 'src/app/shared/formInput/formInput.page';

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
    // FormInputComponent,
  ],
})
export class AccountinfoComponent {
  fb = inject(FormBuilder);
  constructor() {}
  passwordForm = this.fb.group({
    name: [null, Validators.required],
    id: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    email: [null, Validators.required],
    accountName: [null, Validators.required],
    password: [null, Validators.required],
    address: [null, Validators.required],
  });
  formType = {
    name: 'text',
    id: 'text',
    phoneNumber: 'text',
    email: 'text',
    accountName: 'text',
    password: 'text',
    address: 'text',
  };
  passwordForm1 = this.fb.group({
    currentPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
    reNewPassword: [null, Validators.required],
  });
  listformControlName = {
    currentPassword: 'Nhập mật khẩu hiện tại',
    newPassword: 'Nhập mật khẩu mới',
    reNewPassword: 'Xác nhận mật khẩu',
  };
  // listformControlName = {
  //   name: 'Mã khách hàng',
  //   id: 'Tên khách hàng',
  //   phoneNumber: 'Số điện thoại',
  //   email: 'Email',
  //   accountName: 'Tài khoản',
  //   password: 'Mật khẩu',
  //   address: 'Địa chỉ'
  // };
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
