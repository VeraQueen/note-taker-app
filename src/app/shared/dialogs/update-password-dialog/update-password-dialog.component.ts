import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CoreModule } from 'src/app/core.module';

@Component({
  selector: 'app-update-password-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    CoreModule,
  ],
  templateUrl: './update-password-dialog.component.html',
})
export class UpdatePasswordDialogComponent {}
