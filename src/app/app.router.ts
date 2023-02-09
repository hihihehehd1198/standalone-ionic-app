import { AppComponent } from './app.component';
import { Routes } from "@angular/router";

const Router: Routes = [

    {
        path: 'Pages',
        children: [

            {
                path: 'Account-detail',
                loadComponent: () => import('./pages/account/account-detail.page').then(c => c.AccountDetailComponent)
            },
            {
                path: 'Account-detail2',
                loadComponent: () => import('./pages/customer/customer.page').then(c => c.CustomerComponent)
            },
            {
                path: 'Account-detail3',
                loadComponent: () => import('./pages/product/product.page').then(c => c.ProductComponent)
            },
            {
                path: 'Account-detail4',
                loadComponent: () => import('./pages/category/category.page').then(c => c.CategoryComponent)
            },
            {
                path: 'Account-detail5',
                loadComponent: () => import('./pages/order/order.page').then(c => c.OrderComponent)
            },
            {
                path: 'Account-detail5',
                loadComponent: () => import('./pages/order/order.page').then(c => c.OrderComponent)
            },
            {
                path: 'Account-detail6',
                loadComponent: () => import('./pages/servicePage/service.page').then(c => c.ServiceComponent)
            },
            {
                path: 'Account-detail7',
                loadComponent: () => import('./pages/bannerPage/banner.page').then(c => c.BannerComponent)
            },
            {
                path: 'Account-detail8',
                loadComponent: () => import('./pages/branch/branch.page').then(c => c.BranchComponent)
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.page').then(c => c.DashboardComponent),
            },
            {
                path: 'article',
                loadComponent: () => import('./pages/article/article.page').then(c => c.ArticleComponent)
            },
            {
                path: 'account-detail',
                loadComponent: () => import('./pages/account-info/account-info.page').then(c => c.AccountinfoComponent)
            }
        ]
    },
    // {
    //     path: 'my-cv',
    //     loadComponent: () => import('./pages/cv/cv.page').then(c => c.CvComponent)
    // },
    {
        path: '**',
        redirectTo: 'Pages/Account-detail3',
        pathMatch: 'full',

    }

]

export default Router