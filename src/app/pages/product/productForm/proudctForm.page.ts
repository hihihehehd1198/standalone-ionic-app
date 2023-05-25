import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    WritableSignal,
    inject,
    signal,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { SelectInputComponent } from 'src/app/shared/selectInput/selectInput.page';
import { getCategoryAction } from '../../category/store/category.action';
import { CategoryItem } from '../../category/store/category.types';
import { AppStateType } from '../../article/store/article.selector';
import { SelectInputPipe } from 'src/app/shared/selectInput/selectInput.pipe';
import { getListAccountAction } from '../../account/store/account.action';
import { AccountItem } from '../../account/store/account.types';
import { BranchItem } from '../../branch/store/branch.types';
import { getBranchAction } from '../../branch/store/branch.action';
import { createProductAction, updateProductAction } from '../store/product.action';
import { ProductItem } from '../store/product.type';

@Component({
    selector: 'app-product-form',
    templateUrl: 'productForm.page.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        SelectInputComponent,
        SelectInputPipe,
        FormsModule,
    ],
})
export class ProductFormComponent implements OnDestroy, AfterViewInit {
    fb = inject(NonNullableFormBuilder);
    cdf = inject(ChangeDetectorRef);
    modalController = inject(ModalController)

    store = inject(Store)
    action = inject(Actions)
    listCategory: WritableSignal<CategoryItem[]> = signal([])
    getDataAPI?: Subscription
    listBrand: WritableSignal<BranchItem[]> = signal([])


    passingFormData?: any;

    FormEditAddProduct = new FormGroup({
        productId: new FormControl(),
        productName: new FormControl(),
        count: new FormControl(),
        price: new FormControl(),
        categoryId: new FormControl(),
        brandId: new FormControl(),
        location: new FormControl()
    });

    ngAfterViewInit(): void {
        this.FormEditAddProduct = this.fb.group({
            productId: [null, Validators.required],
            productName: [null, Validators.required],
            count: [null, Validators.required],
            price: [null, Validators.required],
            categoryId: [null, Validators.required],
            brandId: [null, Validators.required],
            location: [null, Validators.required],
        });
        this.getlistCategory()
        this.store.dispatch(getCategoryAction())
        this.store.dispatch(getBranchAction())

        if (this.passingFormData) {
            this.FormEditAddProduct.patchValue({
                ...this.passingFormData
            })
        }

        this.cdf.detectChanges();
    }

    getlistCategory() {
        this.getDataAPI = this.store.pipe(tap((x: AppStateType) => {
            // console.log("list cateogyr state", x)
            const defaultCategory = x?.categoryState?.listCategory as CategoryItem[]
            const defaultBrand = x?.brandState?.listBranch as BranchItem[]
            this.listCategory.set(defaultCategory)
            this.listBrand.set(defaultBrand)

            console.log(defaultBrand[0])

            // this.cdf.detectChanges()
            // console.log(defaultCategory.find(x => x.name == this.passingFormData['brandName'])?.id)
            // console.log(this.passingFormData)
            this.passingFormData && this.FormEditAddProduct.patchValue({
                categoryId: defaultCategory.find(x => x.name == this.passingFormData['categoryName'])?.id,
                brandId: defaultBrand.find(x => x.brandName == this.passingFormData['brandName'].toString().split(',')[0])?.id,
                productId: this.passingFormData?.id,
                productName: this.passingFormData?.name
            })
        })).subscribe()
    }

    ngOnDestroy(): void {
        //clear all data
        this.getDataAPI?.unsubscribe()
        this.passingFormData = null

    }
    submitForm(): void {
        console.log(this.FormEditAddProduct.value)
        const rest = this.FormEditAddProduct.value
        const bodyParam = {
            count: +rest.count,
            price: +rest.price,
            location: rest.location,
            name: rest.productName,
            categoryId: rest.categoryId ? [+rest.categoryId] : [],
            brandId: rest.brandId,
        }
        this.modalController.dismiss()
        if (!this.passingFormData) {
            // this.store.dispatch(create)
            this.store.dispatch(createProductAction({
                productItem: {
                    ...bodyParam
                }
            }))
            return;
        }
        this.store.dispatch(updateProductAction({
            productItem: {
                ...bodyParam,
                id: this.passingFormData.id
            }
        }))
    }
    resetForm(): void {
        this.FormEditAddProduct.reset()
    }
    closeModalEvent(): void {
        this.modalController.dismiss()
    }
}
