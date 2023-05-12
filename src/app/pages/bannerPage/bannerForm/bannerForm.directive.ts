import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[BannerFormDirective]',
    standalone: true
})
export class BannerFormDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}