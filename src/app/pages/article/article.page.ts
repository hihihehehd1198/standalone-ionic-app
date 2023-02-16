import { FormGroup } from '@angular/forms';
import { getArticleActionVoid } from './store/article.action';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import listArticleFake from '../article/fakeApi/index';
import { select, Store, StoreModule } from '@ngrx/store';
import { ArticleStore, reducer } from './store/article.reducer';
import { articleSelector } from './store/article.selector';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    CommonModule,
    TableComponent,
    NgFor,
    // StoreModule.forFeature('article', reducer)
  ],
})
export class ArticleComponent implements OnDestroy, AfterViewInit {
  tableDataProps: Article[] = [];
  titleScreen = 'Quản lí bài viết ';
  private apollo = inject(Apollo);
  private store = inject(Store);
  cdf = inject(ChangeDetectorRef);
  listArticleSubscription?: Subscription;
  listArticleData = new BehaviorSubject([]);

  ngAfterViewInit(): void {
    this.getListArticleDefault();
    // this.listArticleData.subscribe();
    // listArticleFake.then()
    this.store.dispatch(getArticleActionVoid());
    // console.log(this.listArticleStore)
    this.store
      .pipe(select(articleSelector))
      .pipe(
        tap((x) => {
          // console.log(x)
        })
      )
      .subscribe();
    this.fakeListArticleApi(); // bug ExpressionChangedAfterItHasBeenCheckedError: Expression has changed 
    this.cdf.detectChanges() // fix bug NG0100/*  */
  }
  updateDom() {

  }

  // generateFormControlGroup(): FormGroup {

  // }

  fakeListArticleApi() {
    const listItem = []
    for (let i = 0; i < 10; i++) {
      const item: Article = {
        stt: i,
        id: `Article_${i}`,
        title: `tieu de ${i}`,
        body: `content ${i}`,
      };
      listItem.push(item);
    }
    this.tableDataProps = [...listItem]
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
