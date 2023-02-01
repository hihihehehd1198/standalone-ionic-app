import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-product',
    templateUrl: 'dialog.page.html',
    styleUrls: ['dialog.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DialogComponent implements OnInit {
    form: FormGroup;
    @Input() formControlsConfig: object = {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    }
    modalController = inject(ModalController)
    formbuilder = inject(FormBuilder)
    constructor() { }
    ngOnInit(): void {
        this.form = this.formbuilder.group(this.formControlsConfig)
    }
    async submitForm() {

        console.log(this.form)
        // await this.modalController.dismiss({

        // })
    }
}
