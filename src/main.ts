import { IonicModule } from '@ionic/angular';
import { enableProdMode, importProvidersFrom, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import Router from './app/app.router';

if (environment.production) {
  enableProdMode();
}



bootstrapApplication(AppComponent, {

  providers: [
    provideRouter(Router),
    importProvidersFrom(
      IonicModule.forRoot({})
    ),
    // {
    //   provide: NgZone,
    //   useValue: new NgZone({ shouldCoalesceEventChangeDetection: false })
    // }
  ]
})  