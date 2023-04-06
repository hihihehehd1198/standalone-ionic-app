import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit, inject, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatestWith, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BrandService } from 'src/app/services/brand.service';
import { ToastService } from 'src/app/services/toast.service';
import { TableComponent } from 'src/app/shared/table/table.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { updateArticleActionFailure, updateArticleActionSuccess } from '../article/store/article.action';
import { ArticleItem } from '../article/store/article.reducer';
import { AppStateType } from '../article/store/article.selector';
import { createBranchAction, createBranchActionFailure, createBranchActionSuccess, deleteBranchAction, deleteBranchActionFailure, deleteBranchActionSuccess, getBranchAction, getBranchActionFailure, getBranchActionSuccess, updateBranchAction } from './store/branch.action';
import { BranchItem } from './store/branch.types';

@Component({
    selector: 'app-branch',
    templateUrl: 'branch.page.html',
    styleUrls: ['branch.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, TableComponent, ToastDirective], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchComponent implements AfterViewInit, OnDestroy {
    private toastService = inject(ToastService)
    private store$ = inject(Store)
    private action$ = inject(Actions)
    cdf = inject(ChangeDetectorRef);

    titleScreen = "Quản lí thương hiệu"

    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective

    getBrandResponse = new Subject<void>()
    editBrandResponse = new Subject<void>()
    deleteBrandResponse = new Subject<void>()
    createBrandResponse = new Subject<void>()
    searchingText = new BehaviorSubject<string>('')
    listBrandSubscription?: Observable<any>;
    listBrandData = new BehaviorSubject([]);

    ngAfterViewInit(): void {

        this.listBrandSubscription = this.store$.pipe(
            combineLatestWith(this.searchingText),
            map(([list, text]: [AppStateType, string]) => {
                return (list?.brandState?.listBranch as BranchItem[]).filter(x => {
                    return x.id.toString().includes(text)
                })
            }),
            // map((x: AppStateType) => {
            //     return x?.brandState?.listBranch
            // }), switchMap((x: BranchItem[]) => {
            //     return this.searchingText.pipe(map((y) => {
            //         const newListBrand = [...x].filter(x => x.id.toString().includes(y))
            //         return newListBrand
            //     }))
            // })
        )
        this.watchAPIResponseToast()
        this.store$.dispatch(getBranchAction()) // dispatch action
        this.cdf.detectChanges()
    }

    updateBrandEvent(data?: BranchItem) {
        if (data) {
            data.id = +data.id
            this.store$.dispatch(updateBranchAction({ branchItem: data }))
        }
    }

    deleteBrandEvent(data?: number[]) {
        if (data && data.length) {
            this.store$.dispatch(deleteBranchAction({ branchId: data }))
        }
    }

    createdBrandEvent(data?: BranchItem) {
        if (data) {
            data.id = +data.id
            this.store$.dispatch(createBranchAction({ branchItem: data }))
        }
    }
    searchEvent(text: string) {
        this.searchingText.next(text)
    }
    watchAPIResponseToast() {
        this.action$.pipe(takeUntil(this.getBrandResponse), ofType(getBranchActionSuccess, getBranchActionFailure)).subscribe((res) => {
            console.log(res)
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action$.pipe(takeUntil(this.editBrandResponse), ofType(updateArticleActionSuccess, updateArticleActionFailure)).subscribe(res => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action$.pipe(takeUntil(this.deleteBrandResponse), ofType(deleteBranchActionSuccess, deleteBranchActionFailure)).subscribe(res => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })

        this.action$.pipe(takeUntil(this.createBrandResponse), ofType(createBranchActionSuccess, createBranchActionFailure)).subscribe(res => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
    }
    ngOnDestroy(): void {
        console.log('branch component has destroy ed');
        this.getBrandResponse.next()
        this.getBrandResponse.complete()

        this.editBrandResponse.next()
        this.editBrandResponse.complete()

        this.deleteBrandResponse.next()
        this.deleteBrandResponse.complete()

        this.createBrandResponse.next()
        this.createBrandResponse.complete()
    }
}
