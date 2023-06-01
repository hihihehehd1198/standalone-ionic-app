import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    inject,
    AfterViewInit,
    signal,
    WritableSignal,
    DoCheck,
    OnDestroy,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MutationResult } from 'apollo-angular';
import { BehaviorSubject, Observable, Subject, Subscription, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem, OrderState } from './store/order.types';
import {
    createOrderActionFailure,
    createOrderActionSuccess,
    deleteOrderActionSuccess,
    getOrderListAction,
    getOrderListActionSuccess,
    getOrderlistActionFailure,
    updateOrderActionFailure,
    updateOrderActionSuccess,
} from './store/order.action';
import { AppStateType } from '../article/store/article.selector';
import { Actions, ofType } from '@ngrx/effects';
import { OrderForm } from './orderForm/order-form.component';
@Component({
    selector: 'app-order',
    templateUrl: 'order.page.html',
    styleUrls: ['order.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, OrderForm],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements AfterViewInit, DoCheck, OnDestroy {
    orderService = inject(OrderService);
    private store = inject(Store);
    private action = inject(Actions);
    private apiStream = new Subscription();

    listOrder = signal<OrderItem[]>([]);
    searchingText = new BehaviorSubject('')


    ngAfterViewInit(): void {
        // const res = this.orderService.getListOrder().pipe(tap((res: MutationResult<any>) => {
        //     console.log(res.data['getOrder'])
        // })).subscribe(_ => {
        //     res.unsubscribe()
        // })

        // this.listOrder.mutate(() => {
        //     return this.store.selectSignal((store) => {
        //         console.log(store)
        //     })
        // })
        this.store.dispatch(getOrderListAction());
        this.apiStream = this.store
            .select((x: AppStateType) => x.orderState as OrderState)
            .pipe(
                switchMap((state: OrderState) => {
                    return this.searchingText.pipe(
                        tap((text) => {
                            const newListOrder = [
                                ...state.listOrder,
                            ].filter((x: OrderItem) => x?.id?.toString().includes(text));
                            this.listOrder.update(_ => newListOrder)
                        }),
                        map(() => of(state)))
                }),
                exhaustMap((_) => {
                    return this.action.pipe(
                        ofType(
                            getOrderListActionSuccess,
                            getOrderlistActionFailure,
                            updateOrderActionSuccess,
                            updateOrderActionFailure,
                            deleteOrderActionSuccess,
                            updateOrderActionFailure,
                            createOrderActionSuccess,
                            createOrderActionFailure
                        ),
                    );
                }),
                //filter with 


            )
            .subscribe((_) => {
                console.log(this.listOrder());
            });
    }
    ngDoCheck(): void {

    }
    ngOnDestroy(): void {
        this.apiStream.unsubscribe();
    }
}
