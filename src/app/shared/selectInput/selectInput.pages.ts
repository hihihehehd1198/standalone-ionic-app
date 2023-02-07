import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-selectInput',
    templateUrl: 'selectInput.pages.html',
    styleUrls: ['selectInput.pages.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class SelectInputComponent {

    constructor() { }
    
}
