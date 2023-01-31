import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-account-info',
    templateUrl: 'account-info.page.html',
    styleUrls: ['account-info.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class AccountinfoComponent {

    constructor() { }
    changePassword(): void {
        console.log('changePassword Work!')
    }
}
