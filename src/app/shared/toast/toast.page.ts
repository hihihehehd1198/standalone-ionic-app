import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit, OnInit, Input, inject, ChangeDetectorRef, ComponentRef, ViewChild, Type, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../button/button.page';
import { ToastDirective } from './toast.directive';
import { ToastInput } from './toastInput.type';
@Component({
    selector: 'app-toast',
    templateUrl: 'toast.page.html',
    styleUrls: ['toast.page.scss'],
    standalone: true,
    imports: [IonicModule, ToastDirective, CommonModule, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements AfterViewInit, OnDestroy {

    inputData?: ToastInput;
    customClass = "bg-[red] w-10px absolute top-0 right-0"
    cdf = inject(ChangeDetectorRef)
    interval: number | undefined
    constructor() {

    }
    ngAfterViewInit(): void {
        // this.cdf.detectChanges()
    }
    loadComponent() {

    }
    ngOnDestroy(): void {
        console.log('toast as destroyed ! ')
    }
}
