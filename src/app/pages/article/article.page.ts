import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';

interface Article {
    stt?: Number,
    id?: String,
    title?: String,
    body?: String,
}
@Component({
    selector: 'app-article',
    templateUrl: 'article.page.html',
    styleUrls: ['article.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, TableComponent]
})
export class ArticleComponent implements OnInit {

    tableDataProps: Article[] = []
    titleScreen = 'Quản lí bài viết '
    ngOnInit(): void {
        this.fakeListArticleApi()
    }
    fakeListArticleApi() {
        for (let i = 0; i < 10; i++) {
            const item: Article = {
                stt: i,
                id: `Article_${i}`,
                title: `tieu de ${i}`,
                body: `content ${i}`
            }
            this.tableDataProps.push(item)
        }
        console.log(this.tableDataProps)
    }
    buttonAddArticleEvent(data?: any) {
        console.log('buttonAddData', data)
    }
    buttonEditArticleEvent(data?: any) {
        console.log('buttonEdit', data)
    }
    buttonDeleteArticleEvent(data?: any) {
        console.log('buttonDeleteData', data)
    }
}
