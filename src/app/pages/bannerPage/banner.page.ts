import { CommonModule } from '@angular/common';
import { Component,ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-banner',
    templateUrl: 'banner.page.html',
    styleUrls: ['banner.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {

    constructor() { }

}
