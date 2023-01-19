import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.page.html',
    styleUrls: ['customer.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class CustomerComponent {

    constructor() { }

}
