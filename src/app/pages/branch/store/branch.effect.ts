import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { BrandService } from "src/app/services/brand.service";
import { getArticleActionFailure } from "../../article/store/article.action";
import { getBannerActionFailure, updateBannerActionSuccess } from "../../bannerPage/store/bannerPage.action";
import { createBranchAction, createBranchActionFailure, createBranchActionSuccess, deleteBranchAction, deleteBranchActionFailure, deleteBranchActionSuccess, getBranchAction, getBranchActionSuccess, updateBranchAction, updateBranchActionFailure, updateBranchActionSuccess } from "./branch.action";
import { BranchItem } from "./branch.types";



@Injectable()
export class BranchEffect {
    private action$ = inject(Actions)
    private branchService = inject(BrandService)
    getBranch$ = createEffect(() => this.action$.pipe(
        ofType(getBranchAction),
        switchMap(() => {
            return this.branchService.getBrand().pipe(map((res) => {
                return getBranchActionSuccess({
                    listBranch: res['data']['getAllbrand-manager']
                })
            }), catchError((err: Error) => {
                return of(getBannerActionFailure({ error: err.message }))
            }))
        })
    ))

    updateBranch$ = createEffect(() => this.action$.pipe(
        ofType(updateBranchAction), switchMap(({ branchItem }) => {
            return this.branchService.updateBrand(branchItem).pipe(map(res => {
                console.log(res)
                return updateBranchActionSuccess({ branchItem })
            }), catchError((err: Error) => {
                return of(updateBranchActionFailure({ error: err.message }))
            }))
        })
    ))


    deleteBranch$ = createEffect(() => this.action$.pipe(
        ofType(deleteBranchAction),
        switchMap(({ branchId }) => {
            return this.branchService.deleteBrand(branchId).pipe(map((res) => {
                return deleteBranchActionSuccess({ branchId: branchId })
            }), catchError((err: Error) => {
                return of(deleteBranchActionFailure({ error: err.message }))
            }))
        })
    ))

    createBranch$ = createEffect(() => this.action$.pipe(
        ofType(createBranchAction),
        switchMap(({ branchItem }) => {
            return this.branchService.createBrand(branchItem).pipe(map(() => {
                return createBranchActionSuccess({ branchItem: branchItem })
            }), catchError((err: Error) => {
                return of(createBranchActionFailure({ error: err.message }))
            }))
        })
    ))
}

