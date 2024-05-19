import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CoreModule } from 'src/app/core.module';

@Component({
  selector: 'app-update-username',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    CoreModule,
  ],
  templateUrl: './update-username.component.html',
})
export class UpdateUsernameDialogComponent {}
