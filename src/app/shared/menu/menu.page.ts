import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouteReuseStrategy, RouterLink } from '@angular/router';
import { IonicModule, IonicRouteStrategy, IonMenu } from '@ionic/angular';
import { Observable, timeout } from 'rxjs';
import { relative } from 'path';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
  // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, AfterViewInit {
  cdf = inject(ChangeDetectorRef);
  constructor() { }
  routes = inject(ActivatedRoute)
  router = inject(Router)
  @ViewChild('menu') menu?: any;

  listUrl = [
    {
      path: 'dashboard',
    },
    {
      path: 'customer-manager',
    },
    {
      path: 'account-manager',
    },
    {
      path: 'product-manager',
    },
    {
      path: 'category',
    },
    {
      path: 'order-manager',
    },
    {
      path: 'booking-manager',
    },
    {
      path: 'service-manager',
    },
    {
      path: 'Banner',
    },
    {
      path: 'brand-manager',
    },
    {
      path: 'article',
    },
  ];

  listMenu: Observable<any> = new Observable((obs) => {
    const fakeData = [
      //
      { name: 'Thống kê', url: '' },
      { name: 'Quản lí khách hàng', url: '' },
      { name: 'Quản lí nhân viên', url: '' },
      { name: 'Quản lí sản phẩm', url: '' },
      { name: 'Quản lí danh mục', url: '' },
      { name: 'Quản lí đặt hàng', url: '' },
      { name: 'Quản lí đặt lịch', url: '' },
      { name: 'Quản lí dịch vụ', url: '' },
      { name: 'Quản lí banner', url: '' },
      { name: 'Quản lí thương hiệu', url: '' },
      { name: 'Quản lí bài viết', url: '' },
    ];
    // for (let i = 0; i < this.listUrl.length.i++) {

    // }

    console.log(fakeData);
    setTimeout(() => {
      fakeData.map((x, index) => {
        x.url = '/Pages/' + this.listUrl[index].path;
        return x;
      });
      obs.next(fakeData);
      this.cdf.detectChanges();
    }, 0);
  });
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.cdf.detectChanges();
    // this.menu?.setOpen(true)
  }
  redirectUrl(url: string) {
    this.router.navigateByUrl(url, { replaceUrl: true })
    // this.router.navigate([url], { replaceUrl: true, relativeTo: this.routes, skipLocationChange: true })
  }
}
