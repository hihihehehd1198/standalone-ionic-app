import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Store } from '@ngrx/store';
import { loginUserAction, loginUserFail, loginUserSuccess } from './UserStore/user.action';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { Actions, ofType } from '@ngrx/effects';
import { ToastService } from 'src/app/services/toast.service';


@Component({
    selector: 'app-login-page',
    templateUrl: 'login-page.page.html',
    styleUrls: ['login-page.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule, ToastDirective, ToastComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginPageComponent implements AfterViewInit, OnDestroy {
    router = inject(Router)
    fb = inject(FormBuilder)
    loginService = inject(LoginService)
    store = inject(Store)
    action = inject(Actions)
    formLogin = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective
    private subscriptionLogin = new Subject<void>()
    private toastService = inject(ToastService)
    private cdf = inject(ChangeDetectorRef)
    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.router.navigateByUrl("/Pages/dashboard")
        // }, 1000)

        this.watchLoginResponse()

    }

    watchLoginResponse() {
        this.action.pipe(takeUntil(this.subscriptionLogin), ofType(loginUserSuccess, loginUserFail)).pipe(tap(res => {
            console.log('res_______________', res)
            this.toastService.generateToast(res, this.host?.viewContainerRef)
            this.cdf.detectChanges()
        })).subscribe()
    }
    loginSubmit(): void {
        // this.loginService.submitLogin(this.formLogin.getRawValue() as {
        //     email: string,
        //     password: string
        // })
        this.store.dispatch(loginUserAction({
            request: this.formLogin.getRawValue() as {
                email: string,
                password: string,
            }
        }))
    }
    navigateForgotPassword(): void {

    }
    ngOnDestroy(): void {
        this.subscriptionLogin.next()
        this.subscriptionLogin.complete()
    }
}
