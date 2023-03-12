import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'dynamicTemp',
})
export class dynamicTemp {
  conatinerRef = inject(ViewContainerRef);
}
