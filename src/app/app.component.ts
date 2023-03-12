import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  inject,
  OnInit,
  AfterViewInit,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  BehaviorSubject,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
// import Router from './app.router';
import { MenuComponent } from './shared/menu/menu.page';
import { ToolbarComponent } from './shared/toolbar/toolbar.page';
import { Apollo, gql, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { ArticleService } from './services/article.service';

import * as firebase from 'firebase/app';
import 'firebase/messaging';
// // import { DynamicCompRenderComponent } from './app/pages/test-login-guard/dynamic-comp-render/dynamic-comp-render.page';
const firebaseConfig = {
  apiKey: 'AIzaSyDkZSndxYuL_T_BuI3mJjXYc_woBcL2uDM',
  authDomain: 'thoikhoabieu-a5075.firebaseapp.com',
  projectId: 'thoikhoabieu-a5075',
  storageBucket: 'thoikhoabieu-a5075.appspot.com',
  messagingSenderId: '296430630672',
  appId: '1:296430630672:web:548df9d6b28bfbc9e75795',
  // vapidKey:
  //   'BEkh9Z6npt9j4OQAu0X3On_-b-w1jtry0l8xW2FJSuECFBMVblUAbrKoq2vhF04LWLd6k7oby2apta6aAQRilSs',
};

firebase.initializeApp(firebaseConfig);

import { getMessaging, onMessage } from 'firebase/messaging';
const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    CommonModule,
    MenuComponent,
    ToolbarComponent,
    ApolloModule,
    HttpClientModule,
    // APOLLO_OPTIONS
  ],
  providers: [ArticleService],
})
export class AppComponent implements OnInit, AfterViewInit {
  isPageApp = new BehaviorSubject(false);
  routeService = inject(Router);
  environmentInjector = inject(EnvironmentInjector);
  // constructor(public environmentInjector: EnvironmentInjector  ) {}
  routerNavigate = inject(Router)
  apollo = inject(Apollo);
  ngZone = inject(NgZone);
  cdf = inject(ChangeDetectorRef);
  ngOnInit() {
    // this.initAPI();
    // this.checkRouteApp();
    // console.log(this.routeService.url)
    // this.routeService.url === '/' && this.routeService.navigateByUrl('/Pages/dashboard')
    this.redirectDashboardRoute()
  }


  redirectDashboardRoute() {

    // setTimeout(() => {
    //   this.routerNavigate.navigate(["/login-page"])
    // }, 1000)
  }

  // checkRouteApp() {
  //   const routeLink = this.routeService.url;
  //   this.isPageApp.next(!routeLink.toString().includes('my-cv'));
  // }
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // this.cdf.detach()

      this.isPageApp.next(true);
      this.cdf.detectChanges();
    });
    this.eventSub3().subscribe((res) => console.log(res));
  }

  eventSub1(): Observable<any> {
    return of(1).pipe(tap(console.log));
  }

  eventSub2(): Observable<any> {
    return of(2).pipe(
      tap(console.log),
      map((x) => x * 2),
      tap(console.log)
    );
  }
  eventSub3(): Observable<any> {
    return this.eventSub1().pipe(mergeMap(this.eventSub2));
  }
  // initAPI() {
  //   this.apollo
  //     .watchQuery({
  //       query: gql`
  //         {
  //           hello2
  //         }
  //       `,
  //     })
  //     .valueChanges.subscribe((res) => console.log(res));
  // }
}
