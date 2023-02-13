import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    MenuComponent,
    ToolbarComponent,
    ApolloModule,
    HttpClientModule,
    // APOLLO_OPTIONS
  ],
  providers: [],
})
export class AppComponent implements OnInit {
  isPageApp = new BehaviorSubject(true);
  routeService = inject(Router);
  environmentInjector = inject(EnvironmentInjector);
  // constructor(public environmentInjector: EnvironmentInjector  ) {}
  apollo = inject(Apollo);

  ngOnInit() {
    this.initAPI();

    // this.checkRouteApp();
    // console.log(this.routeService.url)
    // this.routeService.url === '/' && this.routeService.navigateByUrl('/Pages/dashboard')
  }
  checkRouteApp() {
    // const routeLink = this.routeService.url;
    // this.isPageApp.next(!routeLink.toString().includes('my-cv'));
  }
  initAPI() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            hello2
          }
        `,
      })
      .valueChanges.subscribe((res) => console.log(res));
  }
}
