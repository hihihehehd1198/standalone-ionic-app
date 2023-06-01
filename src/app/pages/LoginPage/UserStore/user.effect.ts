import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import {
    loginUserAction,
    loginUserFail,
    loginUserSuccess,
} from './user.action';
import { LoginState } from './user.type';

@Injectable()
export class UserLoginEffect {
    private action$ = inject(Actions);
    private userLoginService = inject(LoginService);
    private router = inject(Router);
    signinEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loginUserAction),
            switchMap(({ request }) => {
                return this.userLoginService.submitLogin(request).pipe(
                    map((res) => {
                        const userInfo = {
                            ...res['data']['signin'],
                        } as Pick<LoginState, 'accessToken' | 'refreshToken'>;
                        this.userLoginService.setStorageLogin(userInfo.accessToken);
                        return loginUserSuccess({
                            userLogin: {
                                ...userInfo,
                            },
                        });
                    }),
                    catchError((error: any) => {
                        return of(loginUserFail({ error }));
                    })
                );
            })
        )
    );

    redirectAfterEffectSuccess = createEffect(
        () => {
            return this.action$.pipe(
                ofType(loginUserSuccess),
                tap((res: any) => {
                    this.router.navigateByUrl('/Pages', { replaceUrl: true });
                })
            );
        },
        { dispatch: false }
    );
}
