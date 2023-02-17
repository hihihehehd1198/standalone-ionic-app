import { IonicModule } from '@ionic/angular';
import { enableProdMode, importProvidersFrom, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import Router from './app/app.router';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  HttpClientModule,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  withDebugTracing,
  withRouterConfig,
  ROUTER_CONFIGURATION,
} from '@angular/router';
// import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app'
import { HeaderInterceptor } from './app/interceptor/header/header.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './app/pages/article/store/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './app/pages/article/store/article.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NhapComponent } from './app/pages/nhap/nhap.page';
// import { initializeApp } from 'firebase/app';
import { ServiceWorkerModule } from '@angular/service-worker';

import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { SwPush } from '@angular/service-worker';

firebase.initializeApp(environment.firebaseConfig)

import { AngularFireModule } from '@angular/fire/compat';
if (environment.production) {
  enableProdMode();

}

// initializeApp(environment.firebaseConfig)

bootstrapApplication(NhapComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot({}),
      // AngularFireModule.initializeApp(environment.firebaseConfig),
      // ServiceWorkerModule.register('./firebase-messaging-sw.js', {
      //   enabled: environment.production,
      //   registrationStrategy: 'registerImmediately'
      // }),
    ),
  ],
});


// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(
//       Router,
//       withRouterConfig({ paramsInheritanceStrategy: 'always' })
//     ),
//     provideHttpClient(withInterceptors([HeaderInterceptor])),
//     importProvidersFrom(
//       IonicModule.forRoot({}),
//       StoreModule.forFeature('article', reducer),
//       EffectsModule.forFeature([GetArticleEffect]),
//       StoreModule.forRoot({}),
//       EffectsModule.forRoot([]),
//       ApolloModule,
//       StoreDevtoolsModule.instrument({
//         maxAge: 25,
//         logOnly: environment.production,
//       })
//     ),
//     {
//       provide: NgZone,
//       useValue: new NgZone({ shouldCoalesceEventChangeDetection: false }),
//     },
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory(httpLink: HttpLink) {
//         return {
//           cache: new InMemoryCache({
//             addTypename: false,
//           }),
//           link: httpLink.create({
//             uri: 'http://localhost:4000/graphql',
//           }),
//         };
//       },
//       deps: [HttpLink],
//     },
//   ],
// });
