import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopoverComponent } from './../popover/popover.page';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { logOutAction } from 'src/app/pages/LoginPage/UserStore/user.action';
import { LoginService } from 'src/app/services/login.service';

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
    loginService = inject(LoginService)
    constructor() { }
    presentPopover(e: Event) {
        this.popover.event = e;
        this.isOpen = true;

        this.cdf.detectChanges()
    }
    logOut(): void {
        this.store.dispatch(logOutAction())
        this.loginService.logOutAction()
        this.router.navigateByUrl('/login-page', { replaceUrl: true })
    }

    checkRoute(): void {
        console.log('click ')
        this.router.navigateByUrl('Pages/account-detail', { replaceUrl: true })
    }
    toggleMenu(): any {
        // const splitPane = document.querySelector('ion-split-pane');
        // console.log(splitPane)
        const windowWidth = window.innerWidth;
        const splitPaneShownAt = 992;
        const when = `(min-width: ${splitPaneShownAt}px)`;
        // if (windowWidth >= splitPaneShownAt) {
        //     // split pane view is visible
        //     const open = splitPane?.when === when;
        //     // splitPane && splitPane.when = open ? false : when;
        //     if (splitPane) {
        //         splitPane.when = open ? false : when;
        //     }
        // } else {
        //     // split pane view is not visible
        //     // toggle menu open
        //     const menu = splitPane?.querySelector('ion-menu');
        //     menu?.open();
        // }
    }

}
