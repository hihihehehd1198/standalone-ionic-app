import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { MutationResult } from "apollo-angular";
import { Observable, Subscription, tap } from "rxjs";
import { OrderService } from "src/app/services/order.service";
import { ProductItem } from "../../product/store/product.type";
import { OrderItem } from "../store/order.types";




@Component({
    selector: "app-order-form",
    templateUrl: "./order-form.component.html",
    styleUrls: ['./order-form.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderForm implements AfterViewInit, OnDestroy {

    private callApiResponse = new Subscription()
    private action = inject(Actions)
    private store = inject(Store)
    listProductSignal = signal<ProductItem[]>([])
    private orderService = inject(OrderService)

    ngAfterViewInit(): void {
        this.callApiResponse = this.orderService.getOrderDetail(3).pipe(
            tap((res: MutationResult<any>) => {
                const data = res.data['getOrder'][0] as OrderItem
                this.listProductSignal.update(_ => data.productOrder as ProductItem[])
                debugger
            })
        ).subscribe()
    }
    ngOnDestroy(): void {
        this.callApiResponse.unsubscribe()
    }
    trackByFn(index: number, item: ProductItem): number {
        return item.count
    }
}