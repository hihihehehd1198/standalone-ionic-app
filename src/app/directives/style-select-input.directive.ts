import {
  Directive,
  ElementRef,
  inject,
  Renderer2,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appStyleSelectInput]',
  standalone: true,
})
export class StyleSelectInputDirective implements OnInit {
  renderer = inject(Renderer2);
  ref = inject(ElementRef);
  constructor() {}
  ngOnInit(): void {
    
  }
}
