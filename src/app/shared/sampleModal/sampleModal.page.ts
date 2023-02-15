import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CustomInputDirective } from '../../directives/custom-input.directive';
import { FormLabelPipe } from '../../pipes/form-label.pipe';
import { SelectInputComponent } from '../selectInput/selectInput.page';


type modalType = 'form' | 'dialog-confirm' | 'submit';

@Component({
    selector: 'app-sampleModal',
    templateUrl: 'sampleModal.page.html',
    styleUrls: ['sampleModal.page.scss'],
    standalone: true,
    imports: [IonicModule,
        CommonModule,
        ReactiveFormsModule,

        FormLabelPipe,
        CustomInputDirective,
        SelectInputComponent,]
})//asdasd

export class SampleModalComponent implements OnInit {
    formDialogParam!: FormGroup
    listTitleInput?: any
    dialogName?: any
    dialogTitle?: string
    formSubmit?: any // event submit form click 
    listFormControlName?: object
    modalController = inject(ModalController)
    listControlName?: string[];
    list = [1, 2, 3];

    renderer = inject(Renderer2)



    ngOnInit(): void {
        // console.log(this.form?.getRawValue())
        console.log('_________________________________open')
        this.listControlName = Object.keys(this.listFormControlName!) || [];
        console.log(this.listControlName);
        console.log('_________________________________open')

    }
    resetForm() {
        // this.formSubmit()
        this.formDialogParam.reset()
    }
    closeForm() {
        // this.formSubmit()
        this.modalController.dismiss()
    }

}
