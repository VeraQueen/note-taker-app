import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CssLoaderComponent } from '../css-loader/css-loader.component';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [NgIf, CssLoaderComponent],
  selector: 'app-error',
  templateUrl: 'error.component.html',
})
export class ErrorComponent {
  @Input() isLoading: boolean = false;
  @Input() error: string = null;
  currentPage: string;

  constructor(private router: Router) {}

  onHandleError() {
    this.currentPage = this.router.url;
    if (
      this.currentPage === '/search' ||
      this.currentPage === '/auth' ||
      this.currentPage === '/user'
    ) {
      this.error = null;
    } else if (
      this.currentPage === '/playlist' ||
      this.currentPage === '/notes'
    ) {
      this.error = null;
      this.router.navigate(['/playlists']);
    }
  }
}
