import { ToastService } from 'src/app/services/toast.service';
import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, importProvidersFrom, inject, OnDestroy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Store, StoreFeatureModule, StoreModule } from "@ngrx/store";
import { BehaviorSubject, distinctUntilChanged, from, map, Observable, of, skipLast, skipWhile, switchMap, take, takeWhile, tap } from "rxjs";
import { SelectInputComponent } from "src/app/shared/selectInput/selectInput.page";
import { ToastDirective } from "src/app/shared/toast/toast.directive";
import { Actions } from '@ngrx/effects';
import { AppStateType } from '../../article/store/article.selector';
import { AccountItem } from '../../account/store/account.types';
import { getListAccountAction } from '../../account/store/account.action';
import { ApolloModule } from 'apollo-angular';
import { UserManagerService } from 'src/app/services/userManager.service';
import { SharedService } from 'src/app/services/shared.service';
import { BannerItem } from '../store/bannerPage.types';
import { BannerService } from 'src/app/services/banner.service';





@Component({
    selector: 'app-banner-form',
    templateUrl: 'bannerForm.page.html',
    styleUrls: ['bannerForm.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, CommonModule, ReactiveFormsModule, SelectInputComponent,
    ],
    // providers:[
    //     UserManagerService,
    //     importProvidersFrom(
    //         StoreModule.forFeature('')
    //     )
    // ]
})
export class BannerFormComponent implements OnDestroy, AfterViewInit {

    private fb = inject(NonNullableFormBuilder)
    private cdf = inject(ChangeDetectorRef)
    private store = inject(Store)
    private toastService = inject(ToastService)
    private action = inject(Actions)
    private sharedService = inject(SharedService)
    private bannerService = inject(BannerService)
    listLocationData = of(['header', 'footer', 'menu', 'sidebar', 'body-content'])
    listUserSubscription!: Observable<string[]>;
    listUserData = new BehaviorSubject([]);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective
    @ViewChild(FormGroupDirective) myForm!: FormGroupDirective
    defaultImgLink = 'https://uploadfileionic.s3.ap-southeast-1.amazonaws.com/xe.jpg?AWSAccessKeyId=AKIA2II4BUFIGXCWVOW5&Expires=1683841161&Signature=Ah3PLf6Ql2Nh0wXS9su1iPRSXl4%3D'

    FormEditAddBanner = this.fb.group({
        bannerUrl: ["", Validators.required],
        bannerId: ["", Validators.required],
        userId: ["", Validators.required],
        location: ["", Validators.required],
        status: ["", Validators.required],
    });
    // public get FormEditAddBanner() {
    //     return this._FormEditAddBanner;
    // }
    // public set FormEditAddBanner(value) {
    //     this._FormEditAddBanner = value;
    // }

    ngAfterViewInit(): void {
        this.store.dispatch(getListAccountAction())
        this.listUserSubscription = this.store.pipe(map((x: AppStateType) => {
            return x?.accountState?.listAccount.map(x => x.id.toString())
        }),)
        this.listUserSubscription.pipe(distinctUntilChanged((next, prev) => {
            return next.length !== prev.length
        }), tap((res) => {
            console.log('res_________', res)
        }), tap(() => this.cdf.markForCheck())).subscribe()
        // console.log(this.myForm)
    }
    ngOnDestroy(): void {

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
        console.log(this.FormEditAddBanner.value.bannerUrl)


        //get fileName from form control value 
        const filePath = this.FormEditAddBanner.value.bannerUrl
        const fileName = filePath?.substring(filePath.lastIndexOf(String.fromCharCode(92)) + 1, filePath.length)
        const fileData = this.defaultImgLink

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
        }), switchMap((fileLink: string) => {
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
                return this.bannerService.createBanner(formState)
            }

            formState = {
                id: this.FormEditAddBanner.value.bannerId,
                status: !!this.FormEditAddBanner.value.status!,
                userId: +(this.FormEditAddBanner.value.userId!),
                urlImg: fileLink,
                location: this.FormEditAddBanner.value.location!,
            }
            return this.bannerService.createBanner(formState)





        }), tap(console.log), take(1)).subscribe()
    }
    resetForm(): void {

    }
}