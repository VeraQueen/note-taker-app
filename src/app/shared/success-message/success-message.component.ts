// Angular core libraries
import { Component, Input } from '@angular/core';

//Application-specific imports
import { CoreModule } from 'src/app/core.module';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './success-message.component.html',
})
export class SuccessMessageComponent {
  @Input() successMessage: string = null;
}
