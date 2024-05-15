import { NgModule } from '@angular/core';
import { DeletePlaylistDialogComponent } from './delete-playlist-dialog/delete-playlist-dialog.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { ReauthenticationDialogComponent } from './reauthentication-dialog/reauthentication-dialog.component';
import { UpdateEmailDialogComponent } from './update-email-dialog/update-email-dialog.component';
import { UpdatePasswordDialogComponent } from './update-password-dialog/update-password-dialog.component';
import { UpdateUsernameDialogComponent } from './update-username/update-username.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    DeletePlaylistDialogComponent,
    UpdateEmailDialogComponent,
    ReauthenticationDialogComponent,
    UpdatePasswordDialogComponent,
    ForgotPasswordDialogComponent,
    UpdateUsernameDialogComponent,
  ],
  exports: [
    MatDialogModule,
    DeletePlaylistDialogComponent,
    UpdateEmailDialogComponent,
    ReauthenticationDialogComponent,
    UpdatePasswordDialogComponent,
    ForgotPasswordDialogComponent,
    UpdateUsernameDialogComponent,
  ],
})
export class DialogsModule {}
