import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject, EnvironmentInjector, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { head } from 'lodash';
import { ToolbarComponent } from "../shared/toolbar/toolbar.page";
import { MenuComponent } from "../shared/menu/menu.page";
import { ArticleService } from '../services/article.service';
import { Router, RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ArticleComponent } from './article/article.page';

@Component({
  selector: 'app-main-page',
  styles: [],
  template: `<ion-app>
      <app-menu> </app-menu>
  
      <div class="ion-page" id="main-content">
        <app-toolbar> </app-toolbar>
  
        <ion-content class="ion-padding">
          <div class="ion-page" id="main-content"></div>
          <ion-router-outlet
            [environmentInjector]="environmentInjector"
            [animated]="false"
          >
          </ion-router-outlet>
          <!-- <router-outlet>

          </router-outlet> -->
        </ion-content>
      </div>
  </ion-app>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, CommonModule, ToolbarComponent, MenuComponent, RouterOutlet],
  providers: [ArticleService],

})
export class MainPageComponent {
  isPageApp = new BehaviorSubject(false);
  routeService = inject(Router);
  environmentInjector = inject(EnvironmentInjector);
  apollo = inject(Apollo);
  cdf = inject(ChangeDetectorRef);

}
