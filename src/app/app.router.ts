import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { ArticleService } from './services/article.service';
import { importProvidersFrom } from '@angular/core';
import { LoginComponent } from './pages/test-login-guard/pages-guard/login/login.page';
import { LoginGuard } from './login.guard';
import { MainPageComponent } from './pages/main-page.page';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetArticleEffect } from './pages/article/store/article.effect';
import { reducer as articleReducer } from './pages/article/store/article.reducer';
import { reducer as UserReducer } from './pages/LoginPage/UserStore/user.reducer'
import { UserLoginEffect } from './pages/LoginPage/UserStore/user.effect';
const Router: Routes = [
  // {
  //   path: 'login',
  //   // component: LoginComponent,
  //   // loadComponent: () =>
  //   //   import('./pages/test-login-guard/pages-guard/login/login.page').then(
  //   //     (c) => c.LoginComponent
  //   //   ),
  //   children: [
  //     {
  //       path: 'pages1',
  //       loadComponent: () =>
  //         import(
  //           './pages/test-login-guard/pages-guard/pages1/pages1.page'
  //         ).then((c) => c.Pages1Component),
  //       canActivate: [LoginGuard],
  //     },
  //     {
  //       path: 'pages2',
  //       loadComponent: () =>
  //         import(
  //           './pages/test-login-guard/pages-guard/pages2/pages2.page'
  //         ).then((c) => c.Pages2Component),
  //     },
  //     {
  //       path: 'pages3',
  //       loadComponent: () =>
  //         import(
  //           './pages/test-login-guard/pages-guard/pages3/pages3.page'
  //         ).then((c) => c.Pages3Component),
  //     },
  //   ],
  // },
  {
    path: 'Pages',
    component: MainPageComponent,
    children: [
      {
        path: 'Account-detail',
        loadComponent: () =>
          import('./pages/account/account-detail.page').then(
            (c) => c.AccountDetailComponent
          ),
      },
      {
        path: 'Account-detail2',
        loadComponent: () =>
          import('./pages/customer/customer.page').then(
            (c) => c.CustomerComponent
          ),
      },
      {
        path: 'Account-detail3',
        loadComponent: () =>
          import('./pages/product/product.page').then(
            (c) => c.ProductComponent
          ),
      },
      {
        path: 'Account-detail4',
        loadComponent: () =>
          import('./pages/category/category.page').then(
            (c) => c.CategoryComponent
          ),
      },
      {
        path: 'Account-detail5',
        loadComponent: () =>
          import('./pages/order/order.page').then((c) => c.OrderComponent),
      },
      {
        path: 'Account-detail5',
        loadComponent: () =>
          import('./pages/order/order.page').then((c) => c.OrderComponent),
      },
      {
        path: 'Account-detail6',
        loadComponent: () =>
          import('./pages/servicePage/service.page').then(
            (c) => c.ServiceComponent
          ),
      },
      {
        path: 'Account-detail7',
        loadComponent: () =>
          import('./pages/bannerPage/banner.page').then(
            (c) => c.BannerComponent
          ),
      },
      {
        path: 'Account-detail8',
        loadComponent: () =>
          import('./pages/branch/branch.page').then((c) => c.BranchComponent),
      },

      {
        path: 'article',
        providers: [ArticleService, importProvidersFrom(ApolloModule,
          StoreModule.forFeature('article', articleReducer),
          EffectsModule.forFeature([GetArticleEffect]),)],
        loadComponent: () =>
          import('./pages/article/article.page').then(
            (c) => c.ArticleComponent
          ),
      },
      {
        path: 'account-detail',
        loadComponent: () =>
          import('./pages/account-info/account-info.page').then(
            (c) => c.AccountinfoComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (c) => c.DashboardComponent
          ),

        // children: [
        //   {
        //   }
        // ]
      },

    ],
  },
  // {
  //     path: 'my-cv',
  //     loadComponent: () => import('./pages/cv/cv.page').then(c => c.CvComponent)
  // },
  // {
  //   path: '**',
  //   // redirectTo: 'Pages/dashboard',
  //   // redirectTo: 'not-found',
  //   redirectTo: 'Pages/article',

  //   pathMatch: 'full',
  // },
  {
    path: 'login-page',
    providers: [
      importProvidersFrom(
        EffectsModule.forFeature([UserLoginEffect]),
        StoreModule.forFeature('userLogin', UserReducer)
      )
    ],
    loadComponent: () =>
      import('./pages/LoginPage/login-page.page').then(
        (c) => c.LoginPageComponent
      ),
  },
  // {
  //   path: '**',
  //   redirectTo: 'login-page',
  //   pathMatch: 'full',
  // },
  {
    path: 'not-found',
    loadComponent: () =>
      import('../app/pages/notFound/notFound.page').then(
        (c) => c.NotFoundComponent
      ),
  },
];

export default Router;
