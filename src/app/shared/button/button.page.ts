import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
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
    @Input() customClass = "testing"
    @Output() clickEvent?: EventEmitter
    loggingButton(e: any) {

        this.clickEvent?.emit(e)
        console.log('button click ')
    }
}
