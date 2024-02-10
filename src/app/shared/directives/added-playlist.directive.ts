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
    this.renderer.addClass(this.elRef.nativeElement, 'playlist-existing');
  }
}
