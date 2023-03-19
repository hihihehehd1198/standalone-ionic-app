import { inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";



Injectable(
)
export class BannerEffect {
    private action$ = inject(Actions)


    getBannerEffect = createEffect(() =>
        this.action$.pipe())

    createBannerEffect = createEffect(() => this.action$.pipe())

    updateBannerEffect = createEffect(() => this.action$.pipe())

    deleteBannerEffect = createEffect(() => this.action$.pipe())
}
