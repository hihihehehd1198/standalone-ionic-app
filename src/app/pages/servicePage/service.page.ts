import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-service',
    templateUrl: 'service.page.html',
    styleUrls: ['service.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class ServiceComponent {

    constructor() { }

}
