import { inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";



@Injectable()
export class CategoryEffect {
    private action$ = inject(Actions)

    getCategory$ = createEffect(() => this.action$.pipe())

    updateCategory$ = createEffect(() => this.action$.pipe())

    deleteCategory$ = createEffect(() => this.action$.pipe())

    createCategory$ = createEffect(() => this.action$.pipe())
}

