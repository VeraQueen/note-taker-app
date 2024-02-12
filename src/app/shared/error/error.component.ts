import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CssLoaderComponent } from '../css-loader/css-loader.component';
@Component({
  standalone: true,
  imports: [NgIf, CssLoaderComponent],
  selector: 'app-error',
  templateUrl: 'error.component.html',
})
export class ErrorComponent {
  @Input() isLoading: boolean = false;
  @Input() error: string = null;

  onHandleError() {
    this.error = null;
  }
}
