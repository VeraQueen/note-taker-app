import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CoreModule } from 'src/app/core.module';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [
    CoreModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './forgot-password-dialog.component.html',
})
export class ForgotPasswordDialogComponent {}
