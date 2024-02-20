import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appRemoveWatchedVideo]',
})
export class RemoveWatchedVideoDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}

  @HostListener('click') click() {
    this.renderer.removeClass(this.elRef.nativeElement, 'watched');
    this.renderer.setAttribute(this.elRef.nativeElement, 'disabled', 'true');
  }
}
