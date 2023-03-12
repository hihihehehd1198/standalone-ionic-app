import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Store } from '@ngrx/store';
import { loginUserAction } from './UserStore/user.action';


@Component({
    selector: 'app-login-page',
    templateUrl: 'login-page.page.html',
    styleUrls: ['login-page.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginPageComponent implements AfterViewInit {
    router = inject(Router)
    fb = inject(FormBuilder)
    loginService = inject(LoginService)
    store = inject(Store)
    formLogin = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })
    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.router.navigateByUrl("/Pages/dashboard")
        // }, 1000)
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
}
