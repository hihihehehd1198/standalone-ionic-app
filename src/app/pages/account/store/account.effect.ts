import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { UserManagerService } from "src/app/services/userManager.service";
import { UserInfo } from "../../LoginPage/UserStore/user.type";
import { createAccountAction, createAccountActionSuccess, deleteAccountAction, deleteAccountActionFailure, deleteAccountActionSuccess, getListAccountAction, getListAccountActionFailure, getListAccountActionSuccess, updateListAccountAction, updateListAccountActionFailure, updateListAccountActionSuccess } from "./account.action";
import { AccountItem } from "./account.types";



@Injectable()
export class AccountEffect {
    private action$ = inject(Actions)
    private userService = inject(UserManagerService)
    getAccount$ = createEffect(() => this.action$.pipe(
        ofType(getListAccountAction),
        exhaustMap(() => {
            return this.userService.getListUser().pipe(map(res => {
                return getListAccountActionSuccess({
                    listAccount: res['data']['listUser'] || []
                })
            }), catchError((err: Error) => {
                return of(getListAccountActionFailure({ error: err.message }))
            }))
        })
    ), { useEffectsErrorHandler: false })

    updateAccount$ = createEffect(() => this.action$.pipe(
        ofType(updateListAccountAction),
        exhaustMap(({ accountItem }) => {
            return this.userService.updateUser(accountItem).pipe(map(() => {
                const { password, ...rest } = accountItem
                const newResponseData: AccountItem = {
                    ...rest,
                    hashedPassword: password
                }
                return updateListAccountActionSuccess({ accountItem: newResponseData })
            }), catchError((err: Error) => {
                return of(updateListAccountActionFailure({ error: err.message }))
            }))
        })
    ))

    deleteAccount$ = createEffect(() => this.action$.pipe(
        ofType(deleteAccountAction),
        exhaustMap(({ accountId }) => {
            return this.userService.deleteUser(accountId).pipe(map(() => {
                return deleteAccountActionSuccess({ accountId })
            }), catchError((err: Error) => {
                return of(deleteAccountActionFailure({ error: err.message }))
            }))
        })
    ))

    createAccount$ = createEffect(() => this.action$.pipe(
        ofType(createAccountAction),
        switchMap(({ accountItem }) => {

            return this.userService.createUser(accountItem).pipe(map((res) => {
                return createAccountActionSuccess({ accountItem: res['data']['signup']['user'] as AccountItem })
            }))
        })
    ), { dispatch: true })

}

