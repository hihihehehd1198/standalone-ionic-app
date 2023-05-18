import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { BannerService } from "src/app/services/banner.service";
import { createBannerAction, createBannerActionFailure, createBannerActionSuccess, deleteBannerAction, deleteBannerActionFailure, deleteBannerActionSuccess, getBannerAction, getBannerActionFailure, getBannerActionSuccess, updateBannerAction, updateBannerActionFailure, updateBannerActionSuccess } from "./bannerPage.action";



Injectable()
export class BannerEffect {
    private action$ = inject(Actions)
    private bannerService = inject(BannerService)

    getBannerEffect = createEffect(() =>
        this.action$.pipe(
            ofType(getBannerAction),
            switchMap(() => {
                return this.bannerService.getAllBanner().pipe(map((res) => {
                    console.log('res', res)
                    return getBannerActionSuccess({ listBanner: res['data']['getAllBanner'] })
                }), catchError((err: Error) => {
                    return of(getBannerActionFailure({ error: err.message }))
                }))
            })
        ))

    createBannerEffect = createEffect(() => this.action$.pipe(
        ofType(createBannerAction),
        switchMap(({ bannerItem }) => {
            return this.bannerService.createBanner(bannerItem).pipe(map((res) => {
                return createBannerActionSuccess({ bannerItem: res['data']['createBanner'] })
            }), catchError((err: Error) => {
                return of(createBannerActionFailure({ error: err.message }))
            }))
        })
    ))

    updateBannerEffect = createEffect(() => this.action$.pipe(
        ofType(updateBannerAction),
        switchMap(({ banner }) => {
            return this.bannerService.updateBanner(banner).pipe(map((res) => {

                return updateBannerActionSuccess({
                    banner: res['data']['updateBanner']
                })
            }), catchError((err: Error) => {
                return of(updateBannerActionFailure({ error: err.message }))
            }))
        })
    ))

    deleteBannerEffect = createEffect(() => this.action$.pipe(ofType(deleteBannerAction), switchMap(({ id }) => {
        return this.bannerService.deleteBanner(id).pipe(map(() => {
            return deleteBannerActionSuccess({ id })
        }), catchError((err: Error) => {
            return of(deleteBannerActionFailure({ error: err.message }))
        }))
    })))
}
