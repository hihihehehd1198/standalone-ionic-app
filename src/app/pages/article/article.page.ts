import { Apollo, gql } from 'apollo-angular';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';

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
  imports: [IonicModule, CommonModule, TableComponent, NgFor],
})
export class ArticleComponent implements OnInit, OnDestroy {
  tableDataProps: Article[] = [];
  titleScreen = 'Quản lí bài viết ';
  apollo = inject(Apollo);
  listArticleSubscription?: Subscription;
  listArticleData = new BehaviorSubject([]);
  ngOnInit(): void {
    this.fakeListArticleApi();
    this.getListArticleDefault();
    // this.listArticleData.subscribe();
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
    this.listArticleSubscription = this.apollo
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
        tap((res: any) => {
          this.listArticleData.next(res);
        //   console.log(res[0]['jkahsdjkahkdjahjk']);
        //   console.log(res[0].jkahsdjkahkdjahjk);
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    console.log('article component has destroyed ! ');
    this.listArticleSubscription?.unsubscribe();
  }
}
