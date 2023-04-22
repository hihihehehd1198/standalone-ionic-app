import { ToastService } from 'src/app/services/toast.service';
import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, importProvidersFrom, inject, OnDestroy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Store, StoreFeatureModule, StoreModule } from "@ngrx/store";
import { BehaviorSubject, distinctUntilChanged, from, map, Observable, of, skipLast, skipWhile, takeWhile, tap } from "rxjs";
import { SelectInputComponent } from "src/app/shared/selectInput/selectInput.page";
import { ToastDirective } from "src/app/shared/toast/toast.directive";
import { Actions } from '@ngrx/effects';
import { AppStateType } from '../../article/store/article.selector';
import { AccountItem } from '../../account/store/account.types';
import { getListAccountAction } from '../../account/store/account.action';
import { ApolloModule } from 'apollo-angular';
import { UserManagerService } from 'src/app/services/userManager.service';





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

    private fb = inject(FormBuilder)
    private cdf = inject(ChangeDetectorRef)
    private store = inject(Store)
    private toastService = inject(ToastService)
    private action = inject(Actions)
    listLocationData = of(['header', 'footer', 'menu', 'sidebar', 'body-content'])
    listUserSubscription!: Observable<string[]>;
    listUserData = new BehaviorSubject([]);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective
    @ViewChild(FormGroupDirective) myForm!: FormGroupDirective
    defaultImgLink = ''

    FormEditAddBanner = this.fb.group({
        bannerUrl: [null, Validators.required],
        bannerId: [null, Validators.required],
        userId: [null, Validators.required],
        location: [null, Validators.required],
        status: [null, Validators.required],
    });

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
        // const file = new File(event)
    }/*  */
    submitForm(): void {
        console.log(this.FormEditAddBanner.value)
    }
    resetForm(): void {

    }
}