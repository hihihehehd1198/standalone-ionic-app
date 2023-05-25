import { LoginComponent } from './app/pages/test-login-guard/pages-guard/login/login.page';
import { IonicModule } from '@ionic/angular';
import { enableProdMode, importProvidersFrom, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import Router from './app/app.router';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { Capacitor } from '@capacitor/core';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';

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
import { provideFirebaseApp } from '@angular/fire/app'
import { HeaderInterceptor } from './app/interceptor/header/header.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { reducer } from './app/pages/article/store/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './app/pages/article/store/article.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NhapComponent } from './app/pages/nhap/nhap.page';
// import { initializeApp } from 'firebase/app';

// import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';
// if (environment.production) {
//   enableProdMode();
// }
enableProdMode()
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { AppStateType } from './app/pages/article/store/article.selector';
import { metaReducers } from './app/pages/LoginPage/UserStore/meta.reducer';
// import { DynamicCompRenderComponent } from './app/pages/test-login-guard/dynamic-comp-render/dynamic-comp-render.page';
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

const defaultStoreApp: ActionReducerMap<AppStateType | undefined> = undefined

// firebase.initializeApp(firebaseConfig);
// initializeApp(firebaseConfig)

// bootstrapApplication(NhapComponent, {
//   providers: [
//     importProvidersFrom(
//       IonicModule.forRoot({}),
//       AngularFireModule.initializeApp(firebaseConfig)
//       // ServiceWorkerModule.register('./firebase-messaging-sw.js', {
//       //   enabled: environment.production,
//       //   registrationStrategy: 'registerImmediately'
//       // }),
//     ),
//   ],
// });

// bootstrapApplication(DynamicCompRenderComponent, {
//   providers: [
//     provideRouter(
//       Router,
//       withRouterConfig({ paramsInheritanceStrategy: 'always' })
//     ),
//     importProvidersFrom(IonicModule.forRoot(), ApolloModule, HttpClientModule),
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


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      Router,
      withDebugTracing(),    //cai nay de debug cycle cua router r
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideHttpClient(withInterceptors([HeaderInterceptor])),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => {
        if (Capacitor.isNativePlatform()) {
          return initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence
          });
        } else {
          return getAuth();
        }
      }),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      IonicModule.forRoot({}),
      // StoreModule.forFeature('article', reducer),
      // StoreModule.forFeature('userLogin',reducer)
      // EffectsModule.forFeature([GetArticleEffect]),
      // AngularFireModule.initializeApp(firebaseConfig),
      StoreModule.forRoot(defaultStoreApp, { metaReducers: metaReducers }),
      EffectsModule.forRoot([]),
      ApolloModule,
      HttpClientModule,
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      })
    ),
    {
      provide: NgZone,
      useValue: new NgZone({ shouldCoalesceEventChangeDetection: false }),
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache({
            addTypename: false,
          }),
          link: httpLink.create({
            uri: 'https://192.168.43.133:4000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },

  ],
});


// ionic serve -c --ssl --address=192.168.43.133 --no-open
