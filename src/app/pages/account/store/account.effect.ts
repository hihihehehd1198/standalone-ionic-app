import { inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";



@Injectable()
export class AccountEffect {
    private action$ = inject(Actions)

    getAccount$ = createEffect(() => this.action$.pipe())

    updateAccount$ = createEffect(() => this.action$.pipe())

    deleteAccount$ = createEffect(() => this.action$.pipe())

    createAccount$ = createEffect(() => this.action$.pipe())
}

