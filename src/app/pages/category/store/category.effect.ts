import { getArticleActionFailure } from './../../article/store/article.action';
import { AppStateType } from './../../article/store/article.selector';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import {
    getCategoryAction, getCategoryActionFailure, getCategoryActionSuccess, updateCategoryAction, updateCategoryActionFailure, updateCategoryActionSuccess,
    addCategoryAction,
    addCategoryActionFailure,
    addCategoryActionSuccess,
    deleteCategoryAction,
    deleteCategoryActionFailure,
    deleteCategoryActionSuccess,
} from "./category.action";
import { MutationResult } from 'apollo-angular';



@Injectable()
export class CategoryEffect {
    private action$ = inject(Actions)
    private categoryService = inject(CategoryService)
    getCategory$ = createEffect(() => this.action$.pipe(
        ofType(getCategoryAction),
        switchMap(() => {
            return this.categoryService.getListCategory().pipe(map((res) => {
                return getCategoryActionSuccess({
                    listCategory: res['data']['getCategory']
                })
            }), catchError((err: Error) => {
                return of(getCategoryActionFailure({ error: err.message }))
            }))
        })
    ))

    updateCategory$ = createEffect(() => this.action$.pipe(
        ofType(updateCategoryAction),
        switchMap(({ categoryItem }) => {
            return this.categoryService.updateCategory(categoryItem).pipe(map((res: MutationResult) => {
                return updateCategoryActionSuccess({ categoryItem: res['data']['updateCategory'] })
            }),
                catchError((err: Error) => {
                    return of(updateCategoryActionFailure({ error: err.message }))
                }))
        })
    ))

    deleteCategory$ = createEffect(() => this.action$.pipe(
        ofType(deleteCategoryAction),
        switchMap(({ categoryId }) => {
            return this.categoryService.deleteCategory(categoryId).pipe(map(() => {
                return deleteCategoryActionSuccess({ categoryId: categoryId })
            }), catchError((err: Error) => {
                return of(deleteCategoryActionFailure({ error: err.message }))
            }))
        })
    ))

    createCategory$ = createEffect(() => this.action$.pipe(
        ofType(addCategoryAction),
        switchMap(({ categoryItem }) => {
            return this.categoryService.createCategory(categoryItem).pipe(map((res: MutationResult<any>) => {
                return addCategoryActionSuccess({ categoryItem: res['data']['createCategory'] })
            }), catchError((err: Error) => {
                return of(addCategoryActionFailure({ error: err.message }))
            }))
        })
    ))
}

