// Angular core libraries
import { NgIf, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

// Third-party libraries
import { NgIcon } from '@ng-icons/core';
import { fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, NgIcon],
  selector: 'app-scroll-to-top',
  templateUrl: 'scroll-top.component.html',
})
export class ScrollTopComponent {
  showScrollToTopBtn: boolean = false;
  scrollPosition: Number[];

  constructor(private viewport: ViewportScroller) {}

  showScroll = fromEvent(document, 'scroll')
    .pipe(
      map(
        () =>
          (this.scrollPosition = [
            this.viewport.getScrollPosition()[0],
            this.viewport.getScrollPosition()[1],
          ])
      )
    )
    .subscribe((val) => {
      if (val[1] > 1) {
        this.showScrollToTopBtn = true;
      } else {
        this.showScrollToTopBtn = false;
      }
    });

  scrollToTop() {
    this.viewport.scrollToPosition([0, 0]);
  }
}
