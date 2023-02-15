import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EnvironmentInjector, inject, OnInit, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
// import Router from './app.router';
import { MenuComponent } from './shared/menu/menu.page';
import { ToolbarComponent } from './shared/toolbar/toolbar.page';
import { Apollo, gql, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { ArticleService } from './servies/article.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
  apollo = inject(Apollo);
  ngZone = inject(NgZone)
  cdf = inject(ChangeDetectorRef)
  ngOnInit() {
    // this.initAPI();
    // this.checkRouteApp();
    // console.log(this.routeService.url)
    // this.routeService.url === '/' && this.routeService.navigateByUrl('/Pages/dashboard')
  }
  checkRouteApp() {
    // const routeLink = this.routeService.url;
    // this.isPageApp.next(!routeLink.toString().includes('my-cv'));
  }
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // this.cdf.detach()

      this.isPageApp.next(true)
      this.cdf.detectChanges()
    })
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
