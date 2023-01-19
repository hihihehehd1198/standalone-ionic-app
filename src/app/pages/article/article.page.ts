import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-article',
    templateUrl: 'article.page.html',
    styleUrls: ['article.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class ArticleComponent {

    constructor() { }

}
