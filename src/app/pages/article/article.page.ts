import {
    getArticleActionVoid,
    createArticleAction,
    deleteArticleAction,
    updateArticleAction,
    updateArticleActionSuccess,
    getArticleActionSuccess,
    getArticleActionFailure,
    updateArticleActionFailure,
    createArticleActionSuccess,
    createArticleActionFailure,
    deleteArticleActionSuccess,
    deleteArticleActionFailure,
} from './store/article.action';
import { Apollo } from 'apollo-angular';
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
    importProvidersFrom,
    DoCheck,
    AfterContentChecked,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {
    IonicModule,
    ViewDidEnter,
    ViewDidLeave,
    ViewWillEnter,
} from '@ionic/angular';
import { TableComponent } from '../../shared/table/table.page';
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    combineLatestWith,
    filter,
    map,
    Observable,
    of,
    Subject,
    Subscription,
    switchMap,
    takeUntil,
    tap,
    timeout,
    timer,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { ArticleItem, ArticleStore, reducer } from './store/article.reducer';
import { AppStateType, articleSelector } from './store/article.selector';
import { ArticleService } from 'src/app/services/article.service';
import { Actions, ofType } from '@ngrx/effects';
import { LIST_MODULE } from './store/article.type';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { ToastInput } from 'src/app/shared/toast/toastInput.type';
import { ToastService } from 'src/app/services/toast.service';
import { cloneDeep } from 'lodash';
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
    imports: [IonicModule, CommonModule, TableComponent, NgFor, ToastComponent, ToastDirective],
})
export class ArticleComponent implements OnDestroy, AfterViewInit {
    tableDataProps: Article[] = [];
    titleScreen = 'Quản lí bài viết';
    private store = inject(Store);
    private toastService = inject(ToastService)
    cdf = inject(ChangeDetectorRef);
    action = inject(Actions)
    getArticleResponse = new Subject<void>()
    editArticleResponse = new Subject<void>()
    deleteArticleResponse = new Subject<void>()
    createArticleResponse = new Subject<void>()


    searchingText = new BehaviorSubject<string>('')

    listArticleSubscription?: Observable<any>;
    listArticleData = new BehaviorSubject([]);
    articleService = inject(ArticleService);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective




    ngAfterViewInit(): void {
        console.log('rerender');
        this.listArticleSubscription = this.store.pipe(
            map((x: AppStateType) => {
                return x?.article?.listArticle;
            }),
            switchMap((x: ArticleItem[]) => {
                return this.searchingText.pipe(map((y) => {
                    console.log(y)
                    const newlistArticle = [...x].filter(x => x.id.toString().includes(y))
                    console.log(newlistArticle)
                    return newlistArticle
                }))
            })


            // combineLatestWith(this.searchingText),
            // map(([list, text]: [AppStateType, string]) => {
            //   return (list.article.listArticle as ArticleItem[]).filter(x => {
            //     return x.id.toString().includes(text)
            //   })
            // })
        );


        this.watchAPIResponseToast()

        this.store.dispatch(getArticleActionVoid());
        // this.getArticleResponse.subscribe()
        // this.fakeListArticleApi(); // bug ExpressionChangedAfterItHasBeenCheckedError: Expression has changed
        this.cdf.markForCheck(); // fix bug NG0100/*  */

    }



    ngOnChanges(changes: SimpleChanges): void {
        // console.log('checked testing');
    }

    buttonAddArticleEvent(data: ArticleItem) {
        this.store.dispatch(
            createArticleAction({
                article: data,
            })
        );
    }
    buttonEditArticleEvent(data?: ArticleItem) {
        console.log('buttonEdit', data);
        if (data) {
            this.store.dispatch(updateArticleAction({ articleItem: data }));
        }
    }
    buttonDeleteArticleEvent(data?: number[]) {
        if (data && data.length) {
            this.store.dispatch(deleteArticleAction({ id: data }));
        }
    }

    ngOnDestroy(): void {
        console.log('article component has destroyed ! ');
        this.getArticleResponse.next()
        this.getArticleResponse.complete()

        this.editArticleResponse.next()
        this.editArticleResponse.complete()

        this.deleteArticleResponse.next()
        this.deleteArticleResponse.complete()

        this.createArticleResponse.next()
        this.createArticleResponse.complete()

        this.searchingText.unsubscribe()
    }


    watchAPIResponseToast() {
        this.action.pipe(takeUntil(this.getArticleResponse), ofType(getArticleActionFailure, getArticleActionSuccess)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.editArticleResponse), ofType(updateArticleActionSuccess, updateArticleActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.deleteArticleResponse), ofType(deleteArticleActionSuccess, deleteArticleActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.createArticleResponse), ofType(createArticleActionSuccess, createArticleActionSuccess)).subscribe((res) => {

            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
    }

    searchEvent(text: string) {
        this.searchingText.next(text)
    }
}



