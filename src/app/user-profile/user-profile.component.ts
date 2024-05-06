import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../auth/user.model';
import { ErrorComponent } from '../shared/error/error.component';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmailDialogComponent } from '../shared/dialogs/update-email-dialog/update-email-dialog.component';
import { NgForm } from '@angular/forms';
import { ReauthenticationDialogComponent } from '../shared/dialogs/reauthentication-dialog/reauthentication-dialog.component';
import { Observable, concatMap, timer } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { UpdatePasswordDialogComponent } from '../shared/dialogs/update-password-dialog/update-password-dialog.component';
import { SuccessMessageComponent } from '../shared/success-message/success-message.component';
import { UpdateUsernameDialogComponent } from '../shared/dialogs/update-username/update-username.component';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { QuerySnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [ErrorComponent, NgIf, NgIcon, SuccessMessageComponent],
})
export class UserProfileComponent implements OnInit {
  userProfilePicUrl: string;
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
      this.userProfilePicUrl = user.profilePhoto;
    });
  }

  onImageSelected(e) {
    let profilePic: File = e.target.files[0];
    if (profilePic) {
      this.storageService
        .uploadProfilePicture(profilePic)
        .then(() => {
          this.successMessage = 'Profile picture added!';
          this.successMessageTimer().subscribe(() => {
            this.successMessage = null;
            this.storageService.loadProfilePicture().then((url) => {
              this.userService.setProfilePhotoUrl(url).then(() => {
                this.getCurrentUser();
              });
            });
          });
        })
        .catch((error) => {
          this.error = error.message;
        });
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
              this.successMessage = 'Username updated!';
              this.getCurrentUser();
              this.successMessageTimer().subscribe(() => {
                this.successMessage = null;
              });
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
              this.successMessageTimer().subscribe(() => {
                this.successMessage = null;
                this.authService.signOut();
              });
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
              this.successMessageTimer().subscribe(() => {
                this.successMessage = null;
                this.authService.signOut();
              });
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

  private successMessageTimer() {
    return timer(4000);
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
