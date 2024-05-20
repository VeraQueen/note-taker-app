// Angular core libraries
import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

// Application-specific imports
import { CoreModule } from 'src/app/core.module';

@Component({
  selector: 'app-reauthentication-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    CoreModule,
  ],
  templateUrl: './reauthentication-dialog.component.html',
})
export class ReauthenticationDialogComponent {}
