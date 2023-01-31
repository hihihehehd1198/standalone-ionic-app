import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.page.html',
    styleUrls: ['customer.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, TableComponent]
})
export class CustomerComponent {

    constructor() { }

}
