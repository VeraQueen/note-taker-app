import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './success-message.component.html',
})
export class SuccessMessageComponent {
  @Input() successMessage: string = null;
}
