import { Subscription, catchError, of, retry, take, timeout } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
    Component,
    ChangeDetectionStrategy,
    inject,
    AfterViewInit,
    ViewChild,
    OnDestroy,
    ChangeDetectorRef,
    Optional,
    signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgModel,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { LoginService, userLogin } from 'src/app/services/login.service';
import { Store } from '@ngrx/store';
import {
    loginUserAction,
    loginUserFail,
    loginUserSuccess,
} from './UserStore/user.action';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { Actions, ofType } from '@ngrx/effects';
import { ToastService } from 'src/app/services/toast.service';
import { ButtonComponent } from 'src/app/shared/button/button.page';
import {
    FormValidatorModule,
    equalTo,
    required,
} from '@popeyelab/ngx-validator';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { takeWhile } from 'lodash';
import { updateListAccountAction } from '../account/store/account.action';
import {
    Auth,
    authState,
    signInAnonymously,
    signOut,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { ApolloError, QueryResult } from '@apollo/client';
import { UserManagerService } from 'src/app/services/userManager.service';
import { MutationResult } from 'apollo-angular';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login-page.page.html',
    styleUrls: ['login-page.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        ToastDirective,
        ToastComponent,
        FormsModule,
        ButtonComponent,
        FormValidatorModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements AfterViewInit, OnDestroy {
    userForgotPass = signal<string>('');

    userService = inject(UserManagerService);

    router = inject(Router);
    fb = inject(FormBuilder);
    loginService = inject(LoginService);
    store = inject(Store);
    action = inject(Actions);
    fbase = inject(AngularFireAuth);
    route = inject(ActivatedRoute);

    formLogin = this.fb.group({
        email: ['', required('bat buoc nhap')],
        password: ['', required('bat buoc nhap')],
    });
    // formSignUp = this.fb.group({
    //     email: ['',  required('bat buoc nhap')],
    //     userName: ['',  required('bat buoc nhap')],
    //     password: ['',  required('bat buoc nhap')],
    //     rePassword: ['',  required('bat buoc nhap'), equalTo('password')],
    // })

    formSignUp = new FormGroup({
        email: new FormControl('', [required('bat buoc nhap')]),
        userName: new FormControl('', [required('bat buoc nhap')]),
        password: new FormControl('', [required('bat buoc nhap')]),
        rePassword: new FormControl('', [
            required('bat buoc nhap'),
            equalTo('password', 'sai pass roi cu'),
        ]),
    });
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective;
    private subscriptionLogin = new Subject<void>();
    private toastService = inject(ToastService);
    private cdf = inject(ChangeDetectorRef);
    isForgotPassword = false;
    forgotPasswordInput = '';
    numberForm = 0;
    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.router.navigateByUrl("/Pages/dashboard")
        // }, 1000)

        this.watchLoginResponse();
        this.route.params
            .pipe(
                takeUntil(this.subscriptionLogin),
                tap((x: { email?: string }) => {
                    console.log(x.email?.length);
                    if (x.email?.length) {
                        this.numberForm = 2;
                        this.userForgotPass.set(x.email);
                        this.resetForm();
                        this.cdf.markForCheck();
                    }
                })
            )
            .subscribe();
    }

    watchLoginResponse() {
        this.action
            .pipe(
                takeUntil(this.subscriptionLogin),
                ofType(loginUserSuccess, loginUserFail)
            )
            .pipe(
                tap((res) => {
                    console.log('res_______________', res);
                    this.toastService.generateToast(res, this.host?.viewContainerRef);
                    this.cdf.detectChanges();
                })
            )
            .subscribe();
    }
    loginSubmit(): void {
        // this.loginService.submitLogin(this.formLogin.getRawValue() as {
        //     email: string,
        //     password: string
        // })
        this.store.dispatch(
            loginUserAction({
                request: this.formLogin.getRawValue() as {
                    email: string;
                    password: string;
                },
            })
        );
    }
    // navigateForgotPassword(): void {
    //     this.isForgotPassword = true
    // }
    ngOnDestroy(): void {
        this.subscriptionLogin.next();
        this.subscriptionLogin.complete();
    }
    signUp() {
        console.log(this.formSignUp.value);
        const signupData: userLogin = {
            username: this.formSignUp.controls.userName.value as string,
            password: this.formSignUp.controls.password.value as string,
            email: this.formSignUp.controls.email.value as string,
        };
        this.loginService
            .signUp(signupData)
            .pipe(
                takeUntil(this.subscriptionLogin),
                tap((res) => {
                    console.log('res', res);
                    this.formSignUp.reset();
                })
            )
            .subscribe();
    }
    sendEmailforgotPassword(input: HTMLInputElement) {
        console.log(input.value);

        this.fbase
            .sendPasswordResetEmail(input.value)
            .then((_) => {
                input.value = '';
            })
            .catch((err: Error) => {
                this.toastService.generateToast(
                    err.message,
                    this.host?.viewContainerRef
                );
                this.cdf.markForCheck();
            });
    }

    async loginwithFirebase() {
        // console.log(this.login)
        try {
            const provider = new GoogleAuthProvider();
            const res = await this.fbase.signInWithPopup(provider);
            console.log(res);
            const userFind = res.additionalUserInfo?.profile;
            // name id email
            if (!userFind) {
                throw new Error('cannot find user');
            }
            if (
                userFind &&
                'email' in userFind &&
                'id' in userFind &&
                'email' in userFind &&
                'name' in userFind
            ) {
                const response = this.loginService
                    .loginFirebase({
                        email: userFind?.email?.toString() || '',
                        userName: userFind?.name?.toString() || '',
                    })
                    .pipe(
                        tap((res: MutationResult<any>) => {
                            this.toastService.generateToast(
                                { type: 'success' },
                                this.host?.viewContainerRef
                            );
                            if (res?.data?.checkUserLoginFirebase?.requireChangePassword) {
                                //redirect change password

                                this.numberForm = 2;
                                this.resetForm();
                                this.userForgotPass.set(userFind?.email?.toString() || '');
                                console.log(this.userForgotPass());
                            } else {
                                this.loginService.setStorageLogin(res?.data?.checkUserLoginFirebase?.accessToken)
                                this.store.dispatch(
                                    loginUserSuccess({
                                        userLogin: {
                                            accessToken:
                                                res?.data?.checkUserLoginFirebase?.accessToken,
                                            refreshToken:
                                                res?.data?.checkUserLoginFirebase?.refreshToken,
                                        },
                                    })
                                );
                            }
                        }),
                        catchError((err: ApolloError) => {
                            this.toastService.generateToast(
                                err.message,
                                this.host?.viewContainerRef
                            );

                            return of(null);
                        })
                    )
                    .subscribe((_) => {
                        this.cdf.detectChanges();
                        response.unsubscribe();
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }

    resetPasswordEvent(input?: HTMLInputElement) {
        // console.log(this.userForgotPass())
        console.log(input?.value);
        const sub = this.userService
            .changePassword({
                email: this.userForgotPass(),
                password: input?.value || '',
            })
            .pipe(
                tap((res: MutationResult<any>) => {
                    if (res.data) {
                        this.toastService.generateToast(
                            { type: 'success' },
                            this.host?.viewContainerRef
                        );

                        setTimeout(() => {
                            this.resetForm();
                            this.numberForm = 0;
                            this.userForgotPass.set('');
                        }, 1000);
                    }
                }),
                catchError((err: ApolloError) => {
                    this.toastService.generateToast(
                        err.message,
                        this.host?.viewContainerRef
                    );

                    return of(null);
                })
            )
            .subscribe((_) => {
                this.cdf.detectChanges();
                sub.unsubscribe();
            });
    }
    resetForm() {
        this.formSignUp.reset();
        this.formLogin.reset();
    }
}
