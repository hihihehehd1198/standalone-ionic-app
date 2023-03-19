import { inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";



@Injectable()
export class CustomerEffect {
    private action$ = inject(Actions)

    getCustomer$ = createEffect(() => this.action$.pipe())

    updateCustomer$ = createEffect(() => this.action$.pipe())

    deleteCustomer$ = createEffect(() => this.action$.pipe())

    createCustomer$ = createEffect(() => this.action$.pipe())
}

