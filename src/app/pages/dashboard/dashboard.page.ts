import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, importProvidersFrom } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Apollo, gql, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { TableComponent } from '../../shared/table/table.page';
import { HeaderInterceptor } from 'src/app/interceptor/header/header.interceptor';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    TableComponent,
    ApolloModule,
  ],
  providers: [],
})
export class DashboardComponent {
  constructor() {
  }
}
