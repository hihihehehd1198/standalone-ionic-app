import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.page.html',
    styleUrls: ['toolbar.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class ToolbarComponent {
    isClickLogout = true
    constructor() { }

}
