import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouteReuseStrategy, RouterLink } from '@angular/router';
import { IonicModule, IonicRouteStrategy, IonMenu } from '@ionic/angular';
import { Observable, timeout } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, RouterLink],
    // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

})
export class MenuComponent implements OnInit, AfterViewInit {

    constructor() { }
    @ViewChild('menu') menu?: any




    listUrl = [
        {
            path: 'Account-detail',
        },
        {
            path: 'Account-detail2',
        },
        {
            path: 'Account-detail3',
        },
        {
            path: 'Account-detail4',
        },
        {
            path: 'Account-detail5',
        },
        {
            path: 'Account-detail5',
        },
        {
            path: 'Account-detail6',
        },
        {
            path: 'Account-detail7',
        },
        {
            path: 'Account-detail8',
        },
        {
            path: 'dashboard',
        },
        {
            path: 'article',
        },
    ]


    listMenu: Observable<any> = new Observable(obs => {
        const fakeData = [
            { name: 'Thống kê', url: '/Pages/Account-detail' },
            { name: 'Quản lí khách hàng', url: '' },
            { name: 'Quản lí sản phẩm', url: '' },
            { name: 'Quản lí danh mục', url: '' },
            { name: 'Quản lí đặt hàng', url: '' },
            { name: 'Quản lí đặt lịch', url: '' },
            { name: 'Quản lí dịch vụ', url: '' },
            { name: 'Quản lí banner', url: '' },
            { name: 'Quản lí thương hiệu', url: '' },
            { name: 'Quản lí bài viết', url: '' },
        ]
        // for (let i = 0; i < this.listUrl.length.i++) {

        // }

        console.log(fakeData)
        setTimeout(() => {
            fakeData.map((x, index) => {
                x.url = '/Pages/' + this.listUrl[index].path;
                return x;
            })
            obs.next(fakeData)
        }, 0)
    })
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
        // this.menu?.setOpen(true)
    }

}
