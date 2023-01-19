import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class ProductComponent {

    constructor() { }

}
