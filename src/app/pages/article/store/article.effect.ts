import { inject, Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { Actions, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";

/**
 * fake api from promise 
 */
import listArticleFake from '../fakeApi/index'
import { getArticleActionFailure, getArticleActionSuccess, getArticleActionVoid } from "./article.action";


@Injectable()
export class GetArticleEffect {
    private action$ = inject(Actions)
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
}