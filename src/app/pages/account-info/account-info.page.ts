import { FormDialogComponent } from './../../shared/formDialog/formDialog.pages';
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
import { DialogComponent } from '../../shared/dialog/dialog.page';
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
    FormDialogComponent,
    ButtonComponent,
    DialogComponent
    // FormInputComponent,
  ],
})
export class AccountinfoComponent {
  fb = inject(FormBuilder);

  constructor() { }
  passwordForm = this.fb.group({
    name: [null, Validators.required],
    id: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    email: [null, Validators.required],
    accountName: [null, Validators.required],
    password: [null, Validators.required],
    address: [null, Validators.required],
  });
  passwordForm1 = this.fb.group({
    currentPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
    reNewPassword: [null, Validators.required]
  })
  listformControlName = {
    currentPassword: '123',
    newPassword: '123',
    reNewPassword: '123',
  }
  // listformControlName = {
  //   name: 'Mã khách hàng',
  //   id: 'Tên khách hàng',
  //   phoneNumber: 'Số điện thoại',
  //   email: 'Email',
  //   accountName: 'Tài khoản',
  //   password: 'Mật khẩu',
  //   address: 'Địa chỉ'
  // };
  defaultImgLink = '../../../assets/icon/QZlC61BznJJtnoRzxlE2_63569caf1a90d_cvtpl.jpg'
  previewImg(e: any) {
    // console.log(e.target.files[0])
    const reader = new FileReader();
    reader.onload = () => {
      this.defaultImgLink = reader.result as string
    }
    reader.readAsDataURL(e.target.files[0])
  }
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
