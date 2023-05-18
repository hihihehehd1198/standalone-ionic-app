import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef, ViewChild, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { IonModal, IonicModule, ModalController } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';
import { ToastService } from 'src/app/services/toast.service';
import { TableComponent } from 'src/app/shared/table/table.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { AppStateType } from '../article/store/article.selector';
import { BannerFormComponent } from './bannerForm/bannerForm.page';
import { createBannerAction, createBannerActionSuccess, deleteBannerAction, deleteBannerActionFailure, deleteBannerActionSuccess, getBannerAction, getBannerActionFailure, getBannerActionSuccess, updateBannerAction, updateBannerActionFailure, updateBannerActionSuccess } from './store/bannerPage.action';
import { BannerItem } from './store/bannerPage.types';

@Component({
    selector: 'app-banner',
    templateUrl: 'banner.page.html',
    styleUrls: ['banner.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, ToastDirective, TableComponent, BannerFormComponent], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent implements AfterViewInit, OnDestroy {
    titleScreen = 'Quản lí Banner';
    private store = inject(Store);
    private toastService = inject(ToastService)
    cdf = inject(ChangeDetectorRef);
    action = inject(Actions)
    modalController = inject(ModalController);
    getBannerResponse = new Subject<void>()
    editBannerResponse = new Subject<void>()
    deleteBannerResponse = new Subject<void>()
    createBannerResponse = new Subject<void>()


    searchingText = new BehaviorSubject<string>('')

    listBannerSubscription?: Observable<any>;
    listBannerData = new BehaviorSubject([]);
    private bannerService = inject(BannerService);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective




    ngAfterViewInit(): void {
        console.log('rerender');
        this.listBannerSubscription = this.store.pipe(
            map((x: AppStateType) => {
                return x?.bannerState?.listBanner;
            }),
            switchMap((x: BannerItem[]) => {

                return this.searchingText.pipe(map((y) => {
                    console.log('after change : ', x, y)
                    console.log(y)
                    const newlistBanner = [...x].filter(x => x.id.toString().includes(y))
                    // console.log(newlistBanner)
                    return newlistBanner
                }))
            })


            // combineLatestWith(this.searchingText),
            // map(([list, text]: [AppStateType, string]) => {
            //   return (list.Banner.listBanner as BannerItem[]).filter(x => {
            //     return x.id.toString().includes(text)
            //   })
            // })
        );


        this.watchAPIResponseToast()

        this.store.dispatch(getBannerAction());
        // this.getBannerResponse.subscribe()
        // this.fakeListBannerApi(); // bug ExpressionChangedAfterItHasBeenCheckedError: Expression has changed
        this.cdf.detectChanges(); // fix bug NG0100/*  */

    }



    ngOnChanges(changes: SimpleChanges): void {
        // console.log('checked testing');
    }

    buttonAddBannerEvent(data: BannerItem) {
        this.store.dispatch(
            createBannerAction({
                bannerItem: data
            })
        );
    }
    buttonEditBannerEvent(data?: BannerItem) {
        console.log('buttonEdit', data);
        if (data) {
            this.store.dispatch(updateBannerAction({ banner: data }));
        }
    }
    buttonDeleteBannerEvent(data?: number[]) {
        if (data && data.length) {
            this.store.dispatch(deleteBannerAction({ id: data }));
        }
    }

    ngOnDestroy(): void {
        console.log('Banner component has destroyed ! ');
        this.getBannerResponse.next()
        this.getBannerResponse.complete()

        this.editBannerResponse.next()
        this.editBannerResponse.complete()

        this.deleteBannerResponse.next()
        this.deleteBannerResponse.complete()

        this.createBannerResponse.next()
        this.createBannerResponse.complete()

        this.searchingText.unsubscribe()
    }


    watchAPIResponseToast() {
        this.action.pipe(takeUntil(this.getBannerResponse), ofType(getBannerActionFailure, getBannerActionSuccess)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.editBannerResponse), ofType(updateBannerActionSuccess, updateBannerActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.deleteBannerResponse), ofType(deleteBannerActionSuccess, deleteBannerActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.createBannerResponse), ofType(createBannerActionSuccess, createBannerActionSuccess)).subscribe((res) => {

            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
    }

    searchEvent(text: string) {
        this.searchingText.next(text)
    }



    async openDialogBannerForm(data?: BannerItem) {
        // if (!data) {
            const formTemplate = await this.modalController.create({
                component: BannerFormComponent,
                componentProps: {
                    formDialogParam: data,
                    dialogTitle: 'testing',
                    dialogName: 'testing',
                    closeModalEvent: () => { this.closeModal(formTemplate) }
                    // listTitleInput: formControlNameObj,
                    // listFormControlName: this.formcontrolName,
                    // listControlName: this.formcontrolName,
                },
                showBackdrop: true,
                backdropDismiss: true,
                cssClass: '',
            });
            return await formTemplate.present();
        // }
    }
    closeModal(dialog?: HTMLIonModalElement) {
        // console.log(e)
        console.log('testing closing modal')
        dialog?.dismiss()
        this.cdf.detectChanges()
    }
}
