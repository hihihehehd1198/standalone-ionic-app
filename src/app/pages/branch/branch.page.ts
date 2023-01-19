import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-branch',
    templateUrl: 'branch.page.html',
    styleUrls: ['branch.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class BranchComponent {

    constructor() { }

}
