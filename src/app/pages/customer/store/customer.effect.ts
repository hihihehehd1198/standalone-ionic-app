import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CustomerManagerService } from "src/app/services/customerManager.service";
import { deleteCustomerAction, deleteCustomerActionFailure, deleteCustomerActionSuccess, getCustomerAction, getCustomerActionFailure, getCustomerActionSuccess, updateCustomerAction, addCustomerAction, addCustomerActionFailure, addCustomerActionSuccess, updateCustomerActionFailure, updateCustomerActionSuccess } from "./customer.action";



@Injectable()
export class CustomerEffect {
    private action$ = inject(Actions)
    private customerService = inject(CustomerManagerService)
    getCustomer$ = createEffect(() => this.action$.pipe(
        ofType(getCustomerAction),
        switchMap(() => {
            return this.customerService.getListCustomer().pipe(map((res) => {
                return getCustomerActionSuccess({ listCustomer: res['data']['listCustomerAccount'] })
            }), catchError((err: Error) => {
                return of(getCustomerActionFailure({ error: err.message }))
            }))
        })
    ))

    updateCustomer$ = createEffect(() => this.action$.pipe(
        ofType(updateCustomerAction),
        switchMap(({ CustomerItem }) => {
            return this.customerService.updateCustomer(CustomerItem).pipe(map(() => {
                return updateCustomerActionSuccess(({ CustomerItem: CustomerItem }))
            }), catchError((err: Error) => {
                return of(updateCustomerActionFailure({ error: err.message }))
            }))
        })
    ))

    deleteCustomer$ = createEffect(() => this.action$.pipe(
        ofType(deleteCustomerAction),
        switchMap(({ CustomerId }) => {
            return this.customerService.deleteCustomer(CustomerId).pipe(map(() => {
                return deleteCustomerActionSuccess({ CustomerId: CustomerId })
            }), catchError((err: Error) => {
                return of(deleteCustomerActionFailure({ error: err.message }))
            }))
        })
    ))

    createCustomer$ = createEffect(() => this.action$.pipe(
        ofType(addCustomerAction),
        switchMap(({ CustomerItem }) => {
            return this.customerService.createCustomer(CustomerItem).pipe(map((res) => {
                return addCustomerActionSuccess({ CustomerItem: CustomerItem })
            }), catchError((err: Error) => {
                return of(addCustomerActionFailure({ error: err.message }))
            }))
        })
    ))
}

