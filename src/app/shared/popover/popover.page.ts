import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-popover',
    templateUrl: 'popover.page.html',
    styleUrls: ['popover.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class PopoverComponent {

    constructor() { }

}
