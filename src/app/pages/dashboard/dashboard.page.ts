import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['dashboard.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, RouterLink, RouterOutlet, TableComponent]
})
export class DashboardComponent {

    constructor() { }

}
