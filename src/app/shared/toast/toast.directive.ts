import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ToastDirective]',
    standalone: true
})
export class ToastDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}