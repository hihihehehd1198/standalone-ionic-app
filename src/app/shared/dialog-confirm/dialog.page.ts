import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, AfterViewInit, ViewChild, ViewChildren, AfterViewChecked, AfterContentChecked, DoCheck } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonModal, ModalController } from '@ionic/angular';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.page';



@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.page.html',
    styleUrls: ['dialog.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent]
})
export class DialogComponent implements OnInit, OnChanges, AfterViewChecked {

    // @Input() dialogName?: string;
    // @Input() dataParam?: any
    // @Input() dialogTitle?: string;
    // @Output() submitClick?: EventEmitter<any>;
    modalController = inject(ModalController)
    // @ViewChild('modal', { static: false }) confirmModal?: IonModal;
    dialogName?: string;
    dataParam?: any;
    dialogTitle?: string;
    submitClick?: any; //void

    ngOnInit(): void {

    }
    ngOnChanges(changes: SimpleChanges): void {

    }
    ngAfterViewChecked(): void {
        // console.log(this.confirmModal?.htmlAttributes)
    }

    cancelForm(): void {
        this.modalController.dismiss()
    }
    submitForm(): void {
        this.submitClick()
    }

}
