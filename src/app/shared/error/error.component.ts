// Angular core libraries
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Application-specific imports
import { CssLoaderComponent } from '../css-loader/css-loader.component';
import { CoreModule } from 'src/app/core.module';

@Component({
  standalone: true,
  imports: [CoreModule, CssLoaderComponent],
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
