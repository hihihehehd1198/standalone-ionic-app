
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatestWith, map, Observable, Subject, takeUntil } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { TableComponent } from '../../shared/table/table.page';
import { CustomerItem } from './store/customer.types';
import { addCustomerAction, addCustomerActionFailure, addCustomerActionSuccess, deleteCustomerAction, deleteCustomerActionFailure, deleteCustomerActionSuccess, getCustomerAction, getCustomerActionFailure, getCustomerActionSuccess, updateCustomerAction, updateCustomerActionFailure, updateCustomerActionSuccess } from './store/customer.action';
import { AppStateType } from '../article/store/article.selector';

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.page.html',
    styleUrls: ['customer.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, TableComponent, TableComponent, ToastDirective, ToastComponent]
})
export class CustomerComponent implements AfterViewInit, OnDestroy {

    private action$ = inject(Actions)
    private store$ = inject(Store)
    private toastSerivce = inject(ToastService)
    cdf = inject(ChangeDetectorRef);
    getCustomerResponse = new Subject<void>()
    editCustomerResponse = new Subject<void>()
    deleteCustomerResponse = new Subject<void>()
    createCustomerResponse = new Subject<void>()

    titleScreen = "quản lí khách hàng "
    searchingText = new BehaviorSubject<string>('')
    listCustomerSubscription?: Observable<any>;
    listCustomerData = new BehaviorSubject([]);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective


    ngAfterViewInit(): void {
        this.listCustomerSubscription = this.store$.pipe(
            combineLatestWith(this.searchingText),
            map(([list, text]: [AppStateType, string]) => {
                return (list.customerState.listCustomer as CustomerItem[]).filter(x => {
                    return x.id.toString().includes(text)
                })
            })
        )


        this.watchAPIResponseToast()
        this.store$.dispatch(getCustomerAction())


        this.cdf.detectChanges()
    }
    watchAPIResponseToast(): void {
        this.action$.pipe(takeUntil(this.getCustomerResponse), ofType(
            getCustomerActionSuccess, getCustomerActionFailure
        )).subscribe(res => {
            console.log('rest', res)
            this.toastSerivce.generateToast(res, this.host?.viewContainerRef)
        })

        this.action$.pipe(takeUntil(this.editCustomerResponse), ofType(
            updateCustomerActionSuccess, updateCustomerActionFailure
        )).subscribe(res => {

            this.toastSerivce.generateToast(res, this.host?.viewContainerRef)
        })

        this.action$.pipe(takeUntil(this.createCustomerResponse), ofType(
            addCustomerActionSuccess, addCustomerActionFailure
        )).subscribe(res => {
            this.toastSerivce.generateToast(res, this.host?.viewContainerRef)
        })

        this.action$.pipe(takeUntil(this.deleteCustomerResponse), ofType(
            deleteCustomerActionSuccess, deleteCustomerActionFailure
        )).subscribe(res => {
            this.toastSerivce.generateToast(res, this.host?.viewContainerRef)
        })

    }
    ngOnDestroy(): void {
        this.getCustomerResponse.next()
        this.getCustomerResponse.complete()

        this.editCustomerResponse.next()
        this.editCustomerResponse.complete()

        this.createCustomerResponse.next()
        this.createCustomerResponse.complete()

        this.deleteCustomerResponse.next()
        this.deleteCustomerResponse.complete()
    }
    buttonAddCustomerEvent(data: CustomerItem) {
        data.id = +data.id
        this.store$.dispatch(
            addCustomerAction({
                CustomerItem: data
            })
        );
    }
    buttonEditCustomerEvent(data?: CustomerItem) {
        console.log('buttonEdit', data);
        if (data) {
            data.id = +data.id
            this.store$.dispatch(updateCustomerAction({ CustomerItem: data }));
        }
    }
    buttonDeleteCustomerEvent(data?: number[]) {
        if (data && data.length) {
            this.store$.dispatch(deleteCustomerAction({ CustomerId: data }));
        }
    }
    searchEvent(text: string) {
        this.searchingText.next(text)
    }
}
