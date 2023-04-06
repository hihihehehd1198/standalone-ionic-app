import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { SerivceManager } from "src/app/services/service-manager.service";
import { createServiceAction, createServiceActionFailure, createServiceActionSuccess, deleteServiceAction, deleteServiceActionFailure, deleteServiceActionSuccess, getServicePageAction, getServicePageActionFailure, getServicePageActionSuccess, updateServicePageAction, updateServicePageActionFailure, updateServicePageActionSuccess } from "./servicePage.action";

Injectable()
export class ServicePageEffect {

    private action$ = inject(Actions)
    servicePageService = inject(SerivceManager)
    getServicePage$ = createEffect(() => this.action$.pipe(
        ofType(getServicePageAction),
        switchMap(() => {
            return this.servicePageService.getListService().pipe(map((res: any) => {
                return getServicePageActionSuccess({
                    listService: res['data']['getServiceShop']
                })
            }), catchError((err: Error) => {
                return of(getServicePageActionFailure({ error: err.message }))
            }))
        })
    ))

    updateServicePage$ = createEffect(() => this.action$.pipe(
        ofType(updateServicePageAction),
        switchMap(({ serivceItem }) => {
            return this.servicePageService.updateService(serivceItem).pipe(map(() => {
                return updateServicePageActionSuccess({ serivceItem: serivceItem })
            }), catchError((err: Error) => {
                return of(updateServicePageActionFailure({ error: err.message }))
            }))
        })
    ))

    deleteSerivcePage$ = createEffect(() => this.action$.pipe(
        ofType(deleteServiceAction),
        switchMap(({ serviceId }) => {
            return this.servicePageService.deleteService(serviceId).pipe(map(() => {
                return deleteServiceActionSuccess({ serviceId: serviceId })
            }), catchError((err: Error) => {
                return of(deleteServiceActionFailure({ error: err.message }))
            }))
        })
    ))

    createServicePage$ = createEffect(() => this.action$.pipe(
        ofType(createServiceAction),
        switchMap(({ serviceItem }) => {
            return this.servicePageService.createService(serviceItem).pipe(map(() => {
                return createServiceActionSuccess({ serviceItem: serviceItem })
            }), catchError((err: Error) => {
                return of(createServiceActionFailure({ error: err.message }))
            }))
        })
    ))

}
