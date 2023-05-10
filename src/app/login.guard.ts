import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard  {
  private router = inject(Router)
  canMatch(
    route: Route, segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isCanActivate = !!localStorage.getItem('accessToken');
    if (!isCanActivate) {
      this.router.navigate(['/login-page'])
    }
    return isCanActivate;
  }
}