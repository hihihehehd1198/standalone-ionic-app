import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-category',
    templateUrl: 'category.page.html',
    styleUrls: ['category.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {

    constructor() { }

}
