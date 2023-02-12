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
  console.log('testing header');
  const defaultTolken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibmVtQGdtYWlsLmNvbSIsImlhdCI6MTY3NjIxODQzMiwiZXhwIjoxNjc2MjE5MDMyfQ.fUn4ZtY5_otpJtxgphG1SWEiMpnr-O5UbgSQoDl8irQ';
  const token = localStorage.getItem('accessToken') || defaultTolken;
  const newHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  });
  //   newHeader.append(
  //     'authorization',
  //     ''
  //   );
  const newReq = req.clone({
    headers: newHeader,
  });
  const router = inject(Router);
  return next(newReq).pipe(
    tap((x: Error | any) => {
      //   const error = onError(x);
      //   console.log('errr', );
      const authenError = null || x?.body?.errors?.[0].message;
      if (authenError) {
        console.log('authen error : ', authenError);
        router.navigateByUrl('not-found');
      }
    })
  );
};
