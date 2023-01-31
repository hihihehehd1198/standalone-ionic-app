import { PopoverComponent } from './../popover/popover.page';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.page.html',
    styleUrls: ['toolbar.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, PopoverComponent]
})
export class ToolbarComponent {
    isClickLogout = true
    popoverController = inject(PopoverController)
    constructor() { }
    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true,
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
    }
}
