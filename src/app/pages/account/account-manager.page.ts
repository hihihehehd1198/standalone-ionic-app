import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subject, switchMap, takeUntil, timeout } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { UserManagerService } from 'src/app/services/userManager.service';
import { TableComponent } from 'src/app/shared/table/table.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { AppStateType } from '../article/store/article.selector';
import { createAccountAction, createAccountActionSuccess, deleteAccountAction, deleteAccountActionFailure, deleteAccountActionSuccess, getListAccountAction, getListAccountActionFailure, getListAccountActionSuccess, updateListAccountAction, updateListAccountActionFailure, updateListAccountActionSuccess } from './store/account.action';
import { AccountItem, AccountProps, UpdateAccountProps } from './store/account.types';

@Component({
    selector: 'app-account-manager',
    templateUrl: 'account-manager.page.html',
    styleUrls: ['account-manager.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, ToastDirective, ToastComponent, TableComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountManagerComponent implements AfterViewInit, OnDestroy {


    titleScreen = "Quản lí nhân viên"
    private store = inject(Store);
    private toastService = inject(ToastService)
    cdf = inject(ChangeDetectorRef);
    action = inject(Actions)
    getUserAccountResponse = new Subject<void>()
    editUserAccountResponse = new Subject<void>()
    deleteUserAccountResponse = new Subject<void>()
    createUserAccountResponse = new Subject<void>()


    searchingText = new BehaviorSubject<string>('')

    listUserAccountSubscription?: Observable<any>;
    listUserAccountData = new BehaviorSubject([]);
    // private userManagerService = inject(UserManagerService)
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective

    ngAfterViewInit(): void {

        this.listUserAccountSubscription = this.store.pipe(map((x: AppStateType) => {
            return x?.accountState?.listAccount
        }), switchMap((x: AccountItem[]) => {
            console.log('switchmap_____________')
            return this.searchingText.pipe(map((y) => {
                const newListAccount = [...x].filter(x => x.id.toString().includes(y))
                return newListAccount
            }))
        }))
        this.watchAPIResponseToast()
        this.store.dispatch(getListAccountAction())
        this.cdf.detectChanges()
    }


    buttonAddAccountEvent(data: AccountItem) {
        const { id, hashedPassword, ...newData } = data
        const newProps: AccountProps = { ...newData, password: hashedPassword }
        this.store.dispatch(
            createAccountAction({
                accountItem: newProps
            })
        );


        // console.log('create account : ', data)
    }
    buttonEditAccountEvent(data?: AccountItem) {

        if (data) {
            const { hashedPassword, ...rest } = data
            const dataProp: UpdateAccountProps = {
                accountItem: {
                    ...rest,
                    password: hashedPassword
                }
            }
            this.store.dispatch(updateListAccountAction(dataProp));
        }
    }
    buttonDeleteAccountEvent(data?: number[]) {
        if (data && data.length) {
            this.store.dispatch(deleteAccountAction({ accountId: data }));
        }
    }


    ngOnDestroy(): void {
        this.getUserAccountResponse.next()
        this.getUserAccountResponse.complete()

        this.editUserAccountResponse.next()
        this.editUserAccountResponse.complete()

        this.deleteUserAccountResponse.next()
        this.deleteUserAccountResponse.complete()
    }


    watchAPIResponseToast() {
        this.action.pipe(takeUntil(this.getUserAccountResponse), ofType(getListAccountActionSuccess, getListAccountActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.editUserAccountResponse), ofType(updateListAccountActionSuccess, updateListAccountActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.deleteUserAccountResponse), ofType(deleteAccountActionSuccess, deleteAccountActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.createUserAccountResponse), ofType(createAccountActionSuccess, createAccountActionSuccess)).subscribe((res) => {

            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
    }

    searchEvent(text: string) {
        this.searchingText.next(text)
    }
}
