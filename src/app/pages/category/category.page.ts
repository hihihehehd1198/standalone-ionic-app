import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, inject, ChangeDetectorRef, ViewChild, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatestWith, Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';
import { TableComponent } from 'src/app/shared/table/table.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { ToastComponent } from 'src/app/shared/toast/toast.page';
import { AppStateType } from '../article/store/article.selector';
import { addCategoryAction, deleteCategoryAction, deleteCategoryActionFailure, deleteCategoryActionSuccess, getCategoryAction, getCategoryActionFailure, getCategoryActionSuccess, updateCategoryAction, updateCategoryActionFailure, updateCategoryActionSuccess } from './store/category.action';
import { CategoryItem } from './store/category.types';

@Component({
    selector: 'app-category',
    templateUrl: 'category.page.html',
    styleUrls: ['category.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, ToastComponent, ToastDirective, TableComponent], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements AfterViewInit, OnDestroy {
    private store = inject(Store);
    private toastService = inject(ToastService)
    cdf = inject(ChangeDetectorRef);
    action = inject(Actions)
    getCategoryResponse = new Subject<void>()
    editCategoryResponse = new Subject<void>()
    deleteCategoryResponse = new Subject<void>()
    createCategoryResponse = new Subject<void>()


    searchingText = new BehaviorSubject<string>('')

    titleScreen = "Quản lí danh mục"

    listCategorySubscription?: Observable<any>;
    listCategoryData = new BehaviorSubject([]);
    categoryService = inject(CategoryService);
    @ViewChild(ToastDirective, { static: false }) host?: ToastDirective




    ngAfterViewInit(): void {

        this.listCategorySubscription = this.store.pipe(
            combineLatestWith(this.searchingText),
            map(([list, text]: [AppStateType, string]) => {
                return (list.categoryState.listCategory as CategoryItem[]).filter(x => {
                    return x.id.toString().includes(text)
                }) as CategoryItem[]
            })
        );


        this.watchAPIResponseToast()
        this.store.dispatch(getCategoryAction())
        // this.getCategoryResponse.subscribe()
        // this.fakeListCategoryApi(); // bug ExpressionChangedAfterItHasBeenCheckedError: Expression has changed
        this.cdf.detectChanges(); // fix bug NG0100/*  */

    }



    ngOnChanges(changes: SimpleChanges): void {
        // console.log('checked testing');
    }

    buttonAddCategoryEvent(data: CategoryItem) {
        const mappingData: CategoryItem = {
            ...data,
            id: +data.id,
            status: data.status.toString() == 'true' ? true : false
        }
        this.store.dispatch(
            addCategoryAction({
                categoryItem: mappingData
            })
        );
    }
    buttonEditCategoryEvent(data: CategoryItem) {
        const mappingData: CategoryItem = {
            ...data,
            id: +data.id,
            status: data.status.toString() == 'true' ? true : false
        }
        if (data) {
            this.store.dispatch(updateCategoryAction({ categoryItem: mappingData }));
        }
    }
    buttonDeleteCategoryEvent(data?: number[]) {
        if (data && data.length) {
            this.store.dispatch(deleteCategoryAction({ categoryId: data }));
        }
    }

    ngOnDestroy(): void {
        console.log('Category component has destroyed ! ');
        this.getCategoryResponse.next()
        this.getCategoryResponse.complete()

        this.editCategoryResponse.next()
        this.editCategoryResponse.complete()

        this.deleteCategoryResponse.next()
        this.deleteCategoryResponse.complete()

        this.createCategoryResponse.next()
        this.createCategoryResponse.complete()

        this.searchingText.unsubscribe()
    }


    watchAPIResponseToast() {
        this.action.pipe(takeUntil(this.getCategoryResponse), ofType(getCategoryActionFailure, getCategoryActionSuccess)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.editCategoryResponse), ofType(updateCategoryActionSuccess, updateCategoryActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.deleteCategoryResponse), ofType(deleteCategoryActionSuccess, deleteCategoryActionFailure)).subscribe((res) => {
            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
        this.action.pipe(takeUntil(this.createCategoryResponse), ofType(getCategoryActionSuccess, getCategoryActionSuccess)).subscribe((res) => {

            this.toastService.generateToast(res, this.host?.viewContainerRef)
        })
    }

    searchEvent(text: string) {
        this.searchingText.next(text)
    }

}


