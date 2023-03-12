import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { onError } from '@apollo/client/link/error';

export const HeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken')
  console.log(token)
  const newHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  });
  const newReq = req.clone({
    headers: newHeader,
  });

  return next(newReq).pipe(
    tap((x: Error | any) => {
      const authenError = null || x?.body?.errors?.[0].message;
      if (authenError) {
        console.log('authen error : ', authenError);
        router.navigateByUrl('/login-page', { replaceUrl: true });
      }
    })
  );
};
