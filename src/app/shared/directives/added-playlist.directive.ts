import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAddedPlaylist]',
})
export class AddedPlaylistDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {}

  @HostListener('click') click() {
    this.renderer.addClass(this.elRef.nativeElement, 'bg-green-600');
    this.renderer.addClass(this.elRef.nativeElement, 'hover:bg-green-700');
    this.renderer.removeClass(this.elRef.nativeElement, 'bg-red-600');
    this.renderer.removeClass(this.elRef.nativeElement, 'hover:bg-red-700');
  }
}
