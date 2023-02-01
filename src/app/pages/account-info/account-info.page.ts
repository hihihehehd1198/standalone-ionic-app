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
    myUrlImage?: ArrayBuffer | string
    constructor() { }
    changePassword(): void {
        console.log('changePassword Work!')
    }
    testingSelectfile(e: any) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.result) {
                this.myUrlImage = reader.result
            }
        }
        reader.readAsDataURL(file)
    }
    
}
