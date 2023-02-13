import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';
import { map, Observable, Subscription, tap } from 'rxjs';

interface Article {
  stt?: Number;
  id?: String;
  title?: String;
  body?: String;
}
@Component({
  selector: 'app-article',
  templateUrl: 'article.page.html',
  styleUrls: ['article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TableComponent],
})
export class ArticleComponent implements OnInit, OnDestroy {
  tableDataProps: Article[] = [];
  titleScreen = 'Quản lí bài viết ';
  apollo = inject(Apollo);
  listArticle?: Subscription;
  ngOnInit(): void {
    this.fakeListArticleApi();
    this.getListArticleDefault();
  }
  fakeListArticleApi() {
    for (let i = 0; i < 10; i++) {
      const item: Article = {
        stt: i,
        id: `Article_${i}`,
        title: `tieu de ${i}`,
        body: `content ${i}`,
      };
      this.tableDataProps.push(item);
    }
    console.log(this.tableDataProps);
  }
  buttonAddArticleEvent(data?: any) {
    console.log('buttonAddData', data);
  }
  buttonEditArticleEvent(data?: any) {
    console.log('buttonEdit', data);
  }
  buttonDeleteArticleEvent(data?: any) {
    console.log('buttonDeleteData', data);
  }
  getListArticleDefault() {
    this.listArticle = this.apollo
      .watchQuery({
        query: gql`
          query {
            getArticle(id: null) {
              id
              body
              title
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((x) => x.data || {}),
        map((y: any) => Object.values(y)[0] || []),
        tap((res) => {
          console.log('response !', res);
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    console.log('article component has destroyed ! ');
    this.listArticle?.unsubscribe();
  }
}
