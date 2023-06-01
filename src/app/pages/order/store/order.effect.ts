import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { deleteOrderAction, deleteOrderActionFailure, deleteOrderActionSuccess, getOrderListAction, getOrderListActionSuccess, getOrderlistActionFailure, updateOrderAction } from "./order.action";
import { catchError, map, of, switchMap } from "rxjs";
import { OrderService } from "src/app/services/order.service";
import { MutationResult } from "apollo-angular";



@Injectable()
export class OrderEffect {

    private action$ = inject(Actions)
    private orderService = inject(OrderService)
    getOrderList$ = createEffect(() => {
        return this.action$.pipe(ofType(getOrderListAction), switchMap(() => {
            return this.orderService.getListOrder().pipe(map((res: MutationResult<any>) => {
                return getOrderListActionSuccess({
                    listOrder: res.data?.getOrder
                })
            }))
        }), catchError((err: Error) => {
            return of(getOrderlistActionFailure({ error: err.message }))
        }))
    })

    // updateOrder$ = createEffect(()=>{
    //     return this.action$.pipe(ofType(updateOrderAction),switchMap(({orderItem})=>{
    //         return this.orderService
    //     }))
    // })
    deleteOrder$ = createEffect(() => {
        return this.action$.pipe(ofType(deleteOrderAction), switchMap(({ id }) => {
            return this.orderService.deleteOrder(id).pipe(map((res) => {
                return deleteOrderActionSuccess({ id })
            }))
        }), catchError((err: Error) => {
            return of(deleteOrderActionFailure({ error: err.message }))
        }))
    })
}