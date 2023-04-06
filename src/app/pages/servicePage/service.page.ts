import { ToastService } from './../../services/toast.service';
import { BehaviorSubject, combineLatestWith, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { head } from 'lodash';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createServiceAction, createServiceActionFailure, createServiceActionSuccess, deleteServiceAction, deleteServiceActionFailure, deleteServiceActionSuccess, getServicePageAction, getServicePageActionFailure, getServicePageActionSuccess, updateServicePageAction, updateServicePageActionFailure, updateServicePageActionSuccess } from './store/servicePage.action';
import { TableComponent } from 'src/app/shared/table/table.page';
import { ToastDirective } from 'src/app/shared/toast/toast.directive';
import { AppStateType } from '../article/store/article.selector';
import { ServiceItem } from './store/servicePage.types';

@Component({
  selector: 'app-service',
  templateUrl: 'service.page.html',
  styleUrls: ['service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TableComponent, ToastDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent implements AfterViewInit, OnDestroy {

  private action$ = inject(Actions)
  private store$ = inject(Store)
  private toastService = inject(ToastService)
  cdf = inject(ChangeDetectorRef)
  titleScreen = "Quản lí banner"
  @ViewChild(ToastDirective, { static: false }) host?: ToastDirective


  getServiceResponse = new Subject<void>()
  editServiceResponse = new Subject<void>()
  deleteServiceResponse = new Subject<void>()
  createServiceResponse = new Subject<void>()
  searchingText = new BehaviorSubject<string>('')
  listServiceSubscription?: Observable<any>;
  listServiceData = new BehaviorSubject([]);

  ngAfterViewInit(): void {
    this.store$.dispatch(getServicePageAction()) // dispatch action
    this.listServiceSubscription = this.store$.pipe(
      combineLatestWith(this.searchingText),
      tap(console.log),
      map(([list, text]: [AppStateType, string]) => {
        return (list?.servicePage?.listService as ServiceItem[]).filter(x => {
          return x.id.toString().includes(text)
        })
      }),

    )
    this.watchAPIResponseToast()
    this.cdf.detectChanges()

  }

  updateServiceEvent(data?: ServiceItem) {
    if (data) {
      data.id = +data.id
      data.price = Number.parseFloat(data.price.toString())
      this.store$.dispatch(updateServicePageAction({ serivceItem: data }))
    }
  }

  deleteServiceEvent(data?: number[]) {
    if (data && data.length) {
      this.store$.dispatch(deleteServiceAction({ serviceId: data }))
    }
  }

  createdServiceEvent(data?: ServiceItem) {
    if (data) {
      data.id = +data.id
      data.price = Number.parseFloat(data.price.toString())
      this.store$.dispatch(createServiceAction({ serviceItem: data }))
    }
  }
  searchEvent(text: string) {
    this.searchingText.next(text)
  }
  watchAPIResponseToast() {
    this.action$.pipe(takeUntil(this.getServiceResponse), ofType(getServicePageActionSuccess, getServicePageActionFailure)).subscribe((res) => {
      this.toastService.generateToast(res, this.host?.viewContainerRef)
    })
    this.action$.pipe(takeUntil(this.editServiceResponse), ofType(updateServicePageActionSuccess, updateServicePageActionFailure)).subscribe(res => {
      this.toastService.generateToast(res, this.host?.viewContainerRef)
    })
    this.action$.pipe(takeUntil(this.deleteServiceResponse), ofType(deleteServiceActionSuccess, deleteServiceActionFailure)).subscribe(res => {
      this.toastService.generateToast(res, this.host?.viewContainerRef)
    })

    this.action$.pipe(takeUntil(this.createServiceResponse), ofType(createServiceActionSuccess, createServiceActionFailure)).subscribe(res => {
      this.toastService.generateToast(res, this.host?.viewContainerRef)
    })
  }
  ngOnDestroy(): void {
    console.log('branch component has destroy ed');
    this.getServiceResponse.next()
    this.getServiceResponse.complete()

    this.editServiceResponse.next()
    this.editServiceResponse.complete()

    this.deleteServiceResponse.next()
    this.deleteServiceResponse.complete()

    this.createServiceResponse.next()
    this.createServiceResponse.complete()
  }
}
