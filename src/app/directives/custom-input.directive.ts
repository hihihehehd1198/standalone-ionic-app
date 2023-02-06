import { Directive, HostBinding, inject, Renderer2, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appCustomInput]',
  standalone: true
})
export class CustomInputDirective implements OnInit {
  @Input('appCustomInput') formControlName?: string
  renderer = inject(Renderer2)
  ref = inject(ElementRef)

  constructor() {

  }
  ngOnInit(): void {
    if (this.formControlName === 'address') {
      this.renderer.setStyle(this.ref.nativeElement, 'width', '100%')
    }
  }


}