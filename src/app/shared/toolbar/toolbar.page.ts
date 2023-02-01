import { PopoverComponent } from './../popover/popover.page';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.page.html',
    styleUrls: ['toolbar.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, PopoverComponent, RouterLink]
})
export class ToolbarComponent {
    // popoverController = inject(PopoverController)
    @ViewChild('popover') popover: any

    isOpen = false;

    constructor() { }
    presentPopover(e: Event) {
        this.popover.event = e;
        this.isOpen = true;
    }   
}
