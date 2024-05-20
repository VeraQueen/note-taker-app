// Angular core libraries
import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose],
  templateUrl: './delete-playlist-dialog.component.html',
})
export class DeletePlaylistDialogComponent {}
