import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-banner',
    templateUrl: 'banner.page.html',
    styleUrls: ['banner.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class BannerComponent {

    constructor() { }

}
