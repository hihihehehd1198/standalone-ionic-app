import { IonicModule } from '@ionic/angular';
import { enableProdMode, importProvidersFrom, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import Router from './app/app.router';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  HttpClientModule,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { withDebugTracing, withRouterConfig, ROUTER_CONFIGURATION } from "@angular/router"
import { HeaderInterceptor } from './app/interceptor/header/header.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {

  providers: [
    provideRouter(Router, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([HeaderInterceptor])),
    // importProvidersFrom(HttpClientModule) ,
    importProvidersFrom(IonicModule.forRoot({})),
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
});
