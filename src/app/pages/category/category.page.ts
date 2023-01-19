import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-category',
    templateUrl: 'category.page.html',
    styleUrls: ['category.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class CategoryComponent {

    constructor() { }

}
