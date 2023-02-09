import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, IonModal, ModalController } from '@ionic/angular';
import { SampleModalComponent } from '../../shared/sampleModal/sampleModal.page';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, SampleModalComponent]
})
export class ProductComponent {

    modalController = inject(ModalController)
    fb = inject(FormBuilder)
    formGroupping?: FormGroup
    formTemplate!: any
    async openModal() {
        this.formGroupping = this.fb.group({
            name: ['', Validators.required],
            pass: ['', Validators.required],
            mail: ['', Validators.required],
        })
        const formControlNameObj = {
            name: 'ten',
            pass: 'pass',
            mail: 'mail',

        }
        this.formTemplate = await this.modalController.create({
            component: SampleModalComponent,
            componentProps: {
                formDialogParam: this.formGroupping,
                formSubmit: () => {
                    this.submitForm()
                },
                dialogTitle: 'testing',
                dialogName: 'testing',
                // listTitleInput: formControlNameObj,
                listFormControlName: formControlNameObj,
                listControlName: formControlNameObj,
            },
            showBackdrop: true,
            backdropDismiss: true,
            cssClass: ''
        })
        return await this.formTemplate?.present()
    }
    submitForm() {
        console.log(this.formGroupping?.getRawValue())
    }


}




