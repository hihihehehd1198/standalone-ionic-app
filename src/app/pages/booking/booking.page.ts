import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-booking-manager',
    templateUrl: 'booking.page.html',
    styleUrls: ['booking.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements AfterViewInit {

    ngAfterViewInit(): void {

    }

}
