// import { CanComponentDeactivate } from './guards/confirmPage.guard';
import { BookingComponent } from './pages/booking/booking.page';
import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { ArticleService } from './services/article.service';
import { effect, importProvidersFrom } from '@angular/core';
import { LoginComponent } from './pages/test-login-guard/pages-guard/login/login.page';
import { MainPageComponent } from './pages/main-page.page';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetArticleEffect } from './pages/article/store/article.effect';
import { reducer as articleReducer } from './pages/article/store/article.reducer';
import { reducer as UserReducer } from './pages/LoginPage/UserStore/user.reducer'
import { UserLoginEffect } from './pages/LoginPage/UserStore/user.effect';
import { BrandService } from './services/brand.service';
import { BranchEffect } from './pages/branch/store/branch.effect';
import branchReducer from './pages/branch/store/branch.reducer';
import { SerivceManager } from './services/service-manager.service';
import { ServicePageEffect } from './pages/servicePage/store/servicePage.effect';
import serviceReducer from './pages/servicePage/store/servicePage.reducer';
import { CategoryService } from './services/category.service';
import { CategoryEffect } from './pages/category/store/category.effect';
import categoryReducer from './pages/category/store/category.reducer';
import { CustomerManagerService } from './services/customerManager.service';
import CustomerReducer from './pages/customer/store/customer.reducer';
import { CustomerEffect } from './pages/customer/store/customer.effect';
import { AccountEffect } from './pages/account/store/account.effect';
import AccountReducer from './pages/account/store/account.reducer';
import { UserManagerService } from './services/userManager.service';
import { BannerService } from './services/banner.service';
import { BannerEffect } from './pages/bannerPage/store/bannerPage.effects';
import bannerReducer from './pages/bannerPage/store/bannerPage.reducer';
import { canDeactivateGuard } from './guards/checkUser.guard';
import { ProductService } from './services/product.service';
import ProductReducer from './pages/product/store/product.reducer';
import { ProductEffect } from './pages/product/store/product.effect';
import { OrderService } from './services/order.service';
import { OrderEffect } from './pages/order/store/order.effect';
import orderReducer from './pages/order/store/order.reducer';

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
    // canActivate: [LoginGuard],
    // canActivate: [ConfirmDeactivateGuard],

    // canMatch: [LoginGuard],
    // canDeactivate: [(component: MainPageComponent) => {
    //   console.log('guard________________________')
    //   return false
    // }],

    // runGuardsAndResolvers: "paramsOrQueryParamsChange",
    // canDeactivate: [canDeactivateGuard],
    children: [
      {
        path: 'Banner',
        providers: [
          BannerService,
          UserManagerService,
          importProvidersFrom(ApolloModule,
            StoreModule.forFeature('bannerState', bannerReducer),
            StoreModule.forFeature('accountState', AccountReducer),
            EffectsModule.forFeature([BannerEffect, AccountEffect]))
        ],
        loadComponent: () =>
          import('./pages/bannerPage/banner.page').then(
            (c) => c.BannerComponent
          ),
      },
      {
        path: 'account-detail',
        loadComponent: () => import('./pages/account-info/account-info.page').then(c => c.AccountinfoComponent)
      },
      {
        path: "account-manager",
        providers: [
          UserManagerService,
          importProvidersFrom(
            ApolloModule,
            StoreModule.forFeature('accountState', AccountReducer),
            EffectsModule.forFeature([AccountEffect])
          )
        ],
        loadComponent: () => import('./pages/account/account-manager.page').then((c) => c.AccountManagerComponent)
      },
      {
        path: 'customer-manager',
        providers: [
          CustomerManagerService,
          importProvidersFrom(
            ApolloModule,
            StoreModule.forFeature('customerState', CustomerReducer),
            EffectsModule.forFeature([CustomerEffect])
          )
        ],

        loadComponent: () =>
          import('./pages/customer/customer.page').then(
            (c) => c.CustomerComponent
          ),
      },
      {
        path: 'product-manager',
        // data: {
        //   routeParamProps: 'trsting'
        // },
        // resolve: {
        //   testingComponent: () => 'test comp'
        // },
        providers: [
          ProductService,
          BrandService,
          CategoryService,
          importProvidersFrom(
            ApolloModule,
            StoreModule.forFeature('productState', ProductReducer),
            StoreModule.forFeature('brandState', branchReducer),
            StoreModule.forFeature('categoryState', categoryReducer),
            EffectsModule.forFeature([ProductEffect, BranchEffect, CategoryEffect])
          )
        ],


        loadComponent: () =>
          import('./pages/product/product.page').then(
            (c) => c.ProductComponent
          ),
      },
      {
        path: 'category',
        providers: [
          CategoryService,
          importProvidersFrom(
            ApolloModule,
            EffectsModule.forFeature([CategoryEffect]),
            StoreModule.forFeature('categoryState', categoryReducer)
          )
        ],
        loadComponent: () =>
          import('./pages/category/category.page').then(
            (c) => c.CategoryComponent
          ),
      },
      {
        path: 'order-manager',
        providers: [
          OrderService,
          importProvidersFrom(
            ApolloModule,
            EffectsModule.forFeature([OrderEffect]),
            StoreModule.forFeature('orderState', orderReducer)
          )
        ],
        loadComponent: () =>
          import('./pages/order/order.page').then((c) => c.OrderComponent),
      },
      {
        path: 'booking-manager',
        loadComponent: () =>
          import('./pages/booking/booking.page').then((c) => c.BookingComponent),
      },
      {
        path: 'service-manager',
        providers: [
          SerivceManager,
          importProvidersFrom(
            ApolloModule,
            EffectsModule.forFeature([ServicePageEffect]),
            StoreModule.forFeature('servicePage', serviceReducer)
          )
        ],
        loadComponent: () =>
          import('./pages/servicePage/service.page').then(
            (c) => c.ServiceComponent
          ),
      },
      {
        path: 'banner-manager',
        providers: [
          importProvidersFrom(
            StoreModule.forFeature('accountState', AccountReducer),
            EffectsModule.forFeature([AccountEffect])
          )
        ],
        loadComponent: () =>
          import('./pages/bannerPage/banner.page').then(
            (c) => c.BannerComponent
          ),
      },
      {
        path: 'brand-manager',
        providers: [BrandService, importProvidersFrom(
          ApolloModule,
          EffectsModule.forFeature([BranchEffect]),
          StoreModule.forFeature('brandState', branchReducer)
        )],
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
      // {
      //   path: 'Banner',
      //   providers: [BannerService, importProvidersFrom(ApolloModule,
      //     StoreModule.forFeature('brandState', bannerReducer),
      //     EffectsModule.forFeature([BannerEffect]))],
      //   loadComponent: () =>
      //     import('./pages/bannerPage/banner.page').then(
      //       (c) => c.BannerComponent
      //     ),
      // },
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
  {
    path: 'login-page',
    providers: [
      UserManagerService,
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

  {
    path: 'reset-password/:email',
    providers: [
      UserManagerService,
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

  {
    path: '',
    redirectTo: 'Pages/product-manager',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    // redirectTo: 'Pages/dashboard',
    // redirectTo: 'not-found',
    redirectTo: "Pages/product-manager",
    // redirectTo: 'Pages/article',

    pathMatch: 'full',
  },

  // {
  //   path: '',
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
