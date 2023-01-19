import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, timeout } from 'rxjs';

@Component({
    selector: 'app-account-detail',
    templateUrl: 'account-detail.page.html',
    styleUrls: ['account-detail.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class AccountDetailComponent implements OnInit {

    constructor() { }
    ngOnInit(): void {

    }

}
