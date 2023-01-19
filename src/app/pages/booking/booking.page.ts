import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-booking',
    templateUrl: 'booking.page.html',
    styleUrls: ['booking.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class BookingComponent {

    constructor() { }

}
