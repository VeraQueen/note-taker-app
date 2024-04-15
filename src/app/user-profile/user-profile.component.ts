import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../auth/user.model';
import { ErrorComponent } from '../shared/error/error.component';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '../shared/dialogs/email-dialog/email-dialog.component';
import { NgForm } from '@angular/forms';
import { PasswordDialogComponent } from '../shared/dialogs/password-dialog/password-dialog.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [ErrorComponent, NgIf],
})
export class UserProfileComponent implements OnInit {
  username: string;
  userEmail: string;
  user: User;
  successMessage: string;
  error: string;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.userEmail = user.email;
      this.username = user.username;
    });
  }

  updateEmail() {
    let dialogRef = this.dialog.open(EmailDialogComponent);
    let newEmail;
    dialogRef.afterClosed().subscribe((res: NgForm) => {
      if (res.value.email) {
        newEmail = res.value.email;
        console.log(newEmail);
        this.authService
          .verifyUserEmailToUpdate(newEmail)
          .then(() => {
            console.log('email verified and changed');
            this.successMessage =
              'Email changed! To start using it, check your email for the verification link.';
            this.successMessageTimeout();
          })
          .catch((error) => {
            if (error.message.includes('auth/requires-recent-login')) {
              let passwordDialogRef = this.dialog.open(PasswordDialogComponent);
              passwordDialogRef.afterClosed().subscribe((res: NgForm) => {
                if (res.value.password) {
                  this.authService
                    .reauthenticateUser(res.value.password)
                    .then(() => {
                      this.successMessage =
                        'Successfully reauthenticated! Continue to updating your email and then check your email for the verification link.';
                      this.successMessageTimeout();
                    });
                }
              });
            } else {
              this.error = error.message;
            }
          });
      }
    });
  }

  private successMessageTimeout() {
    setTimeout(() => {
      this.successMessage = null;
    }, 4000);
  }
}
