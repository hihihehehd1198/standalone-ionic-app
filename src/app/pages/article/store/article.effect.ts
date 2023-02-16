import { inject, Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleService } from 'src/app/servies/article.service';

/**
 * fake api from promise
 */
import listArticleFake from '../fakeApi/index';
import {
  getArticleActionFailure,
  getArticleActionSuccess,
  getArticleActionVoid,
} from './article.action';

@Injectable()
export class GetArticleEffect {
  private action$ = inject(Actions);
  articleService = inject(ArticleService);
  /**with fake API  */
  getArticle$ = createEffect(() =>
      this.action$.pipe(
          ofType(getArticleActionVoid),
          switchMap(async () => {
              // return listArticleFake.then(x => { })
              const listData = await listArticleFake
              return getArticleActionSuccess({ listArticle: listData })
          }),
          catchError((err: any) => {
              return of(getArticleActionFailure({ error: err }))
          })
      )
  )

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
