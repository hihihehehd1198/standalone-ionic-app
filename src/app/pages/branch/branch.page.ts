import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-branch',
    templateUrl: 'branch.page.html',
    styleUrls: ['branch.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchComponent {

    constructor() { }

}
