// shimmer.directive.ts
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appShimmer]',
  standalone: true
})
export class ShimmerDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.classList.add('shimmer-effect');
  }
}
