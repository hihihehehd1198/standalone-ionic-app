import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopoverComponent } from './../popover/popover.page';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { logOutAction } from 'src/app/pages/LoginPage/UserStore/user.action';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.page.html',
    styleUrls: ['toolbar.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, PopoverComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    // popoverController = inject(PopoverController)
    @ViewChild('popover') popover: any
    private store = inject(Store)
    isOpen = false;
    router = inject(Router)
    cdf = inject(ChangeDetectorRef)

    constructor() { }
    presentPopover(e: Event) {
        this.popover.event = e;
        this.isOpen = true;
        this.cdf.detectChanges()
    }
    logOut(): void {
        this.store.dispatch(logOutAction())
        this.router.navigateByUrl('/login-page', { replaceUrl: true })
    }
    checkRoute(): void {
        console.log('click ')
        this.router.navigateByUrl('Pages/account-detail', { replaceUrl: true })
    }
}
