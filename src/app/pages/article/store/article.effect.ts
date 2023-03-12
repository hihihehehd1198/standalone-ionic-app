import { ArticleItem } from './article.reducer';
import { inject, Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, skipWhile, switchMap, takeUntil } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

/**
 * fake api from promise
 */
import listArticleFake from '../fakeApi/index';
import {
  createArticleAction,
  createArticleActionFailure,
  createArticleActionSuccess,
  deleteArticleAction,
  deleteArticleActionFailure,
  deleteArticleActionSuccess,
  getArticleActionFailure,
  getArticleActionSuccess,
  getArticleActionVoid,
  updateArticleAction,
  updateArticleActionFailure,
  updateArticleActionSuccess,
} from './article.action';
import { Store } from '@ngrx/store';
import genericActionModule from 'src/app/shared/store/statusAPI.action';
import { ModuleAPI } from 'src/app/shared/store/statusAPI.type';

@Injectable()
export class GetArticleEffect {
  private action$ = inject(Actions);
  articleService = inject(ArticleService);
  /**with fake API  */
  private store = inject(Store)
  getArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(getArticleActionVoid),
      switchMap(() => {
        return this.articleService.getListArticle().pipe(map((res) => {

          return getArticleActionSuccess({
            listArticle: res['data']['getArticle']
            // listArticle: null

          })

        }), catchError((err: Error) => {
          return of(getArticleActionFailure({ error: err.message }))
        }))
      }),



      // ))
    )
  )


  deleteArticle$ = createEffect(() =>
    this.action$.pipe(ofType(deleteArticleAction), switchMap(({ id }) => {

      return this.articleService.deleteArticle(id).pipe(
        map(() => {
          return deleteArticleActionSuccess({ id })
        }),
        catchError((err: Error) => of(deleteArticleActionFailure({ error: err.message })))
      )
    })))


  updateArticle$ = createEffect(() => this.action$.pipe(
    ofType(updateArticleAction),
    switchMap(({ articleItem }) => {
      return this.articleService.updateArticle(articleItem).pipe(
        map(() => {
          console.log('testing update article ')
          return updateArticleActionSuccess({ articleItem: articleItem })
        }),
        catchError((err: Error) => of(updateArticleActionFailure({ error: err.message })))
      )
    })
  ))

  createArticle$ = createEffect(() => this.action$.pipe(
    ofType(createArticleAction),
    switchMap(({ article }) => {
      return this.articleService.createArticle(article).pipe(
        map(() => {
          return createArticleActionSuccess({
            article
          })
        }),
        catchError((err: Error) => of(createArticleActionFailure({ error: err.message })))
      )
    })

  ))

  /** without fake API , using call GraphqlAPI  */
  // getArticle$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(getArticleActionVoid),
  //     switchMap(() => {
  //       // return listArticleFake.then(x => { })
  //       return this.articleService.getListArticle().pipe(
  //         map((res) => {
  //           console.log(res);
  //           return getArticleActionSuccess(res?.data);
  //         })
  //       );
  //     }),
  //     catchError((err: Error) => {
  //       console.error(err);

  //       return of(getArticleActionFailure({ error: err }));
  //     })
  //   )
  // );
}
