import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './forgot-password-dialog.component.html',
})
export class ForgotPasswordDialogComponent {}
