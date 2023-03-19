import { inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";

Injectable()
export class ServicePageEffect {

    private action$ = inject(Actions)

    getServicePage$ = createEffect(() => this.action$.pipe())

    updateServicePage$ = createEffect(() => this.action$.pipe())

    deleteSerivcePage$ = createEffect(() => this.action$.pipe())

    createServicePage$ = createEffect(() => this.action$.pipe())

}
