import { AppStateType } from './../article/store/article.selector';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    signal,
    SimpleChanges,
    ViewChild,
    WritableSignal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, IonModal, ModalController } from '@ionic/angular';
import { SampleModalComponent } from '../../shared/sampleModal/sampleModal.page';
import { ProductFormComponent } from './productForm/proudctForm.page';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import {
    BehaviorSubject,
    distinctUntilChanged,
    map,
    of,
    Subscription,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { ProductItem } from './store/product.type';
import { TableComponent } from 'src/app/shared/table/table.page';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { ToastService } from 'src/app/services/toast.service';
import {
    getArticleActionFailure,
    getArticleActionSuccess,
} from '../article/store/article.action';
import {
    createProductActionFailure,
    createProductActionSuccess,
    deleteProductAction,
    deleteProductActionFailure,
    deleteProductActionSuccess,
    getProductAction,
    getProductActionFailure,
    getProductActionSuccess,
    updateProductActionFailure,
    updateProductActionSuccess,
} from './store/product.action';
import { ActivatedRoute } from '@angular/router';
import { ProductPipe } from './product.pipe';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonicModule,
        CommonModule,
        SampleModalComponent,
        ProductPipe,
        ProductFormComponent,
        TableComponent,
        ToastComponent,
        ToastDirective,
    ],
})
export class ProductComponent implements OnDestroy, AfterViewInit {
    cdf = inject(ChangeDetectorRef);
    store = inject(Store);
    action = inject(Actions);
    searchingText = new BehaviorSubject('');
    modalController = inject(ModalController);
    titleScreen = 'quản lí sản phẩm';
    apiSubscription?: Subscription;
    toastService = inject(ToastService);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective;

    // activateRoute = inject(ActivatedRoute)
    listProduct: WritableSignal<ProductItem[]> = signal([]);
    ngAfterViewInit(): void {
        // this.activateRoute.data.pipe(distinctUntilChanged(), take(10), tap(res => {
        //     console.log('test param passing ', res)
        // })).subscribe()

        //fix bug overlay modal controller
        // this.modalController.getTop()

        this.apiSubscription = this.store
            .pipe(
                switchMap((x: AppStateType) => {
                    console.log(x?.productState.listProductItem);
                    return this.searchingText.pipe(
                        map((y) => {
                            const newListProduct = [
                                ...x?.productState?.listProductItem,
                            ].filter((x: ProductItem) => x.id.toString().includes(y));
                            return newListProduct as ProductItem[];
                        })
                    );
                }),
                switchMap((listProduct: ProductItem[]) => {
                    return this.action.pipe(
                        ofType(
                            getProductActionFailure,
                            getProductActionSuccess,
                            deleteProductActionSuccess,
                            deleteProductActionFailure,
                            updateProductActionSuccess,
                            updateProductActionFailure,
                            createProductActionSuccess,
                            createProductActionFailure
                        ),
                        tap((res) => {
                            // console.log(listProduct)
                            this.listProduct.set(listProduct);
                            console.log('________________', this.listProduct(), res);
                            return this.toastService.generateToast(
                                res,
                                this.host?.viewContainerRef
                            );
                        })
                    );
                })
            )
            .subscribe();

        this.store.dispatch(getProductAction());
        // this.cdf.detectChanges() -- when use signal ,cd as auto run 
    }
    ngOnDestroy(): void {
        this.apiSubscription?.unsubscribe();
    }

    buttonDeleteProductEvent(data: any) {
        this.store.dispatch(
            deleteProductAction({
                id: data,
            })
        );
    }

    async openDialogProductForm(data: any) {
        console.log('update data ', data);
        const formTemplate = await this.modalController.create({
            component: ProductFormComponent,
            componentProps: {
                passingFormData: data,
                dialogTitle: 'testing',
                dialogName: 'testing',
                closeModalEvent: () => {
                    this.closeModal(formTemplate);
                },
                // listTitleInput: formControlNameObj,
                // listFormControlName: this.formcontrolName,
                // listControlName: this.formcontrolName,
            },
            showBackdrop: true,
            backdropDismiss: true,
            cssClass: '',
        });
        return await formTemplate.present();
    }

    closeModal(dialog?: HTMLIonModalElement) {
        // console.log(e)
        console.log('testing closing modal');
        dialog?.dismiss();
        // this.cdf.detectChanges();
    }

    searchEvent(text: string) {
        this.searchingText.next(text);
    }
}
