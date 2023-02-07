import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ButtonComponent } from '../button/button.page';



@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.page.html',
    styleUrls: ['dialog.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent]
})
export class DialogComponent implements OnInit, OnChanges {

    @Input() dialogName?: string;
    @Input() dataParam?: any
    @Input() dialogTitle?: string;
    @Output() submitClick?: EventEmitter<any>

    ngOnInit(): void {

    }
    ngOnChanges(changes: SimpleChanges): void {

    }
    cancelForm(modal: IonModal): void {
        modal.dismiss()
    }
    submitForm(): void {
        this.submitClick?.emit()
    }

}
