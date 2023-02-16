import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-popover',
    templateUrl: 'popover.page.html',
    styleUrls: ['popover.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {

    constructor() { }

}
