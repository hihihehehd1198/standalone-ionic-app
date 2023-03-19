import { inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";



@Injectable()
export class BranchEffect {
    private action$ = inject(Actions)

    getBranch$ = createEffect(() => this.action$.pipe())

    updateBranch$ = createEffect(() => this.action$.pipe())

    deleteBranch$ = createEffect(() => this.action$.pipe())

    createBranch$ = createEffect(() => this.action$.pipe())
}

