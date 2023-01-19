import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-order',
    templateUrl: 'order.page.html',
    styleUrls: ['order.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class OrderComponent {

    constructor() { }

}
