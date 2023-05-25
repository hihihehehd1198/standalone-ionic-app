import { ToastService } from 'src/app/services/toast.service';
import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, importProvidersFrom, inject, Input, OnDestroy, Output, signal, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Store, StoreFeatureModule, StoreModule } from "@ngrx/store";
import { BehaviorSubject, distinctUntilChanged, from, map, Observable, of, skipLast, skipWhile, Subject, Subscription, switchMap, take, takeUntil, takeWhile, tap } from "rxjs";
import { SelectInputComponent } from "src/app/shared/selectInput/selectInput.page";
import { ToastDirective } from "src/app/shared/toast/toast.directive";
import { Actions, EffectsModule, ofType } from '@ngrx/effects';
import { AppStateType } from '../../article/store/article.selector';
import { AccountItem } from '../../account/store/account.types';
import { getListAccountAction } from '../../account/store/account.action';
import { ApolloModule } from 'apollo-angular';
import { UserManagerService } from 'src/app/services/userManager.service';
import { SharedService } from 'src/app/services/shared.service';
import { BannerItem } from '../store/bannerPage.types';
import { BannerService } from 'src/app/services/banner.service';
import { createBannerAction, createBannerActionSuccess, deleteBannerActionFailure, deleteBannerActionSuccess, updateBannerAction, updateBannerActionFailure, updateBannerActionSuccess } from '../store/bannerPage.action';
import { BannerEffect } from '../store/bannerPage.effects';





@Component({
    selector: 'app-banner-form',
    templateUrl: 'bannerForm.page.html',
    styleUrls: ['bannerForm.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, CommonModule, ReactiveFormsModule, SelectInputComponent,

    ],

})
export class BannerFormComponent implements OnDestroy, AfterViewInit {

    private fb = inject(NonNullableFormBuilder)
    private cdf = inject(ChangeDetectorRef)
    private store = inject(Store)
    private toastService = inject(ToastService)
    private action = inject(Actions)
    private sharedService = inject(SharedService)
    private bannerService = inject(BannerService)
    listLocationData = ['header', 'footer', 'menu', 'sidebar', 'body-content']
    listUserIdSignal = signal<number[]>([])
    listUserSubscription?: Subscription;
    listUserData = new BehaviorSubject([]);

    closeModalEvent?: any
    formDialogParam?: BannerItem
    dialogTitle = ''
    dialogName = ''

    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective
    @ViewChild(FormGroupDirective) myForm!: FormGroupDirective
    @ViewChild('imgInstance', { static: false }) imgInstance!: ElementRef<any>
    defaultImgLink = ''

    FormEditAddBanner = new FormGroup({
        bannerUrl: new FormControl(),
        bannerId: new FormControl(),
        userId: new FormControl(),
        location: new FormControl(),
        status: new FormControl(),
    })

    @Output('bannerInputEmitValue') bannerInputEmitValue?: EventEmitter<BannerItem> = new EventEmitter<BannerItem>()

    // public get FormEditAddBanner() {
    //     return this._FormEditAddBanner;
    // }
    // public set FormEditAddBanner(value) {
    //     this._FormEditAddBanner = value;
    // }

    editBannerResponse = new Subject<void>()
    deleteBannerResponse = new Subject<void>()
    createBannerResponse = new Subject<void>()

    ngAfterViewInit(): void {
        this.store.dispatch(getListAccountAction())
        this.FormEditAddBanner = this.fb.group({
            bannerUrl: [null, Validators.required],
            bannerId: [null, Validators.required],
            userId: [null, Validators.required],
            location: [null, Validators.required],
            status: [null, Validators.required],
        });
        // this.listUserSubscription = this.store.pipe(map((x: AppStateType) => {
        //     return x?.accountState?.listAccount.map(x => x.id.toString())
        // }),)
        this.listUserSubscription = this.store.pipe(map((x: AppStateType) => {
            return x?.accountState?.listAccount.map(x => x.id.toString())
        }), switchMap((listUser) => {
            this.listUserIdSignal.set(listUser.map(x => +x))
            return listUser
        }),

            /**
             * todo : using it with utils func
             */
            distinctUntilChanged((o1, o2) => {
                return Object.keys(o1).length !== Object.keys(o2).length
                    && Object.keys(o1).every((p: any) => o1[p] !== o2[p]);
            }),
            tap(() => {
                // console.log(this.formDialogParam)

                if (this.formDialogParam) {

                    const { urlImg, id, status, ...rest } = this.formDialogParam as BannerItem
                    // this.imgInstance?.nativeElement.src = urlImg as string
                    this.defaultImgLink = urlImg
                    // console.log(this.imgInstance.nativeElement)
                    this.imgInstance.nativeElement.src = urlImg as string
                    this.FormEditAddBanner.patchValue({
                        ...rest,
                        bannerId: id,
                        // bannerUrl: urlImg,
                        status: status as boolean,
                    })
                }

                // this.cdf.detectChanges()
            })).subscribe()
        // console.log(this.myForm)]
        this.cdf.detectChanges()
        console.log(this.bannerInputEmitValue?.emit())


    }
    ngOnDestroy(): void {
        this.listUserSubscription?.unsubscribe()

    }

    previewImg(event?: any) {
        const reader = new FileReader();
        reader.onload = () => {
            this.defaultImgLink = reader.result as string // base 64 data
            console.log(this.defaultImgLink, typeof this.defaultImgLink)
            this.cdf.detectChanges()
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    submitForm(): void {





        //get fileName from form control value 
        const filePath = this.FormEditAddBanner.value.bannerUrl
        const fileName = filePath?.substring(filePath.lastIndexOf(String.fromCharCode(92)) + 1, filePath.length)
        const fileData = this.defaultImgLink
        if (!filePath) {
            this.updateOrCreateBanner(this.defaultImgLink)
        }
        //upload file and generate img link 
        fileName && this.sharedService.uploadFileS3({
            file: fileData,
            fileName
        }).pipe(map(res => {
            // console.log(res['data']['uploadFile'] === "ok")
            return res['data']['uploadFile'] === "ok"
        }), switchMap((res) => {
            if (!res) {
                return of(null)
            }
            return this.sharedService.getUrlS3(fileName)
        }), map(res => {
            return res['data']['getURLS3'] || ''
        }), tap((fileLink: string) => {
            this.updateOrCreateBanner(fileLink)
        })).subscribe()
    }
    resetForm(): void {
        console.log("first", this.FormEditAddBanner.value)
    }



    updateOrCreateBanner(fileLink: string) {
        debugger;
        let formState: any
        if (
            !this.FormEditAddBanner.value.bannerId?.toString().length
        ) {
            formState = {

                status: !!this.FormEditAddBanner.value.status!,
                userId: +(this.FormEditAddBanner.value.userId!),
                urlImg: fileLink,
                location: this.FormEditAddBanner.value.location!,
            }
            this.store.dispatch(createBannerAction({ bannerItem: formState }))
            this.cdf.markForCheck()
            return;
        }

        formState = {
            id: this.FormEditAddBanner.value.bannerId,
            status: !!this.FormEditAddBanner.value.status!,
            userId: +(this.FormEditAddBanner.value.userId!),
            urlImg: fileLink,
            location: this.FormEditAddBanner.value.location!,
        }

        console.log('testing_________________')
        this.store.dispatch(updateBannerAction({ banner: formState }))
        this.closeModalEvent()
        this.cdf.markForCheck()
        return;
    }
}