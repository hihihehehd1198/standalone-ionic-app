import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, IonModal, ModalController } from '@ionic/angular';
import { SampleModalComponent } from '../../shared/sampleModal/sampleModal.page';
import { ProductFormComponent } from './productForm/proudctForm.page';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, CommonModule, SampleModalComponent, ProductFormComponent]
})
export class ProductComponent implements OnDestroy, AfterViewInit {

    cdf = inject(ChangeDetectorRef)
    store = inject(Store)
    action = inject(Actions)

    ngAfterViewInit(): void {

    }
    ngOnDestroy(): void {

    }
}




