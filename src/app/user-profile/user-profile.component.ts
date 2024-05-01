import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../auth/user.model';
import { ErrorComponent } from '../shared/error/error.component';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmailDialogComponent } from '../shared/dialogs/update-email-dialog/update-email-dialog.component';
import { NgForm } from '@angular/forms';
import { ReauthenticationDialogComponent } from '../shared/dialogs/reauthentication-dialog/reauthentication-dialog.component';
import { timer } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { UpdatePasswordDialogComponent } from '../shared/dialogs/update-password-dialog/update-password-dialog.component';
import { SuccessMessageComponent } from '../shared/success-message/success-message.component';
import { UpdateUsernameDialogComponent } from '../shared/dialogs/update-username/update-username.component';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [ErrorComponent, NgIf, NgIcon, SuccessMessageComponent],
})
export class UserProfileComponent implements OnInit {
  username: string;
  userEmail: string;
  user: User;
  successMessage: string;
  error: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.userEmail = user.email;
      this.username = user.username;
    });
  }

  onImageSelected(e) {
    let profilePic: File = e.target.files[0];
    console.log(profilePic);
    if (profilePic) {
      this.storageService.uploadProfilePicture(profilePic);
    }
  }

  updateUsername() {
    this.reauthentication()
      .then(() => {
        let updateUsernameDialogRef = this.dialog.open(
          UpdateUsernameDialogComponent
        );
        let username: string;
        updateUsernameDialogRef.afterClosed().subscribe((res: NgForm) => {
          if (res.value?.username) {
            username = res.value.username;
            this.userService.setUsername(username).then(() => {
              this.getCurrentUser();
            });
          }
        });
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  updateEmail() {
    this.reauthentication()
      .then(() => {
        let emailDialogRef = this.dialog.open(UpdateEmailDialogComponent);
        let newEmail: string;
        emailDialogRef.afterClosed().subscribe((res: NgForm) => {
          if (res.value?.email) {
            newEmail = res.value.email;
            this.userService.verifyUserEmailToUpdate(newEmail).then(() => {
              this.successMessage =
                'Email changed! Check your email for the verification link.';
              this.successMessageTimerAndLogout();
            });
          }
        });
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  changePassword() {
    this.reauthentication()
      .then(() => {
        let passwordDialogRef = this.dialog.open(UpdatePasswordDialogComponent);
        let newPassword: string;
        passwordDialogRef.afterClosed().subscribe((res: NgForm) => {
          if (res.value?.password) {
            newPassword = res.value.password;
            this.userService.updatePassword(newPassword).then(() => {
              this.successMessage = 'Password changed!';
              this.successMessageTimerAndLogout();
            });
          }
        });
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  logout() {
    this.authService.signOut();
  }

  private successMessageTimerAndLogout() {
    timer(4000).subscribe(() => {
      this.successMessage = null;
      this.authService.signOut();
    });
  }

  private reauthentication() {
    let reauthenticationDialogRef = this.dialog.open(
      ReauthenticationDialogComponent
    );
    return new Promise<void>((resolve, reject) => {
      reauthenticationDialogRef.afterClosed().subscribe((res: NgForm) => {
        if (res.value?.password) {
          this.authService
            .reauthenticateUser(res.value.password)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    });
  }
}
