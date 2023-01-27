import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonButtons, IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-button',
    templateUrl: 'button.page.html',
    styleUrls: ['button.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class ButtonComponent {

    constructor() { }
    loggingButton() {
        console.log('button click ')
    }
}
