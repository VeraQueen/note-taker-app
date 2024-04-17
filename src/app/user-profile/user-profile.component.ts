import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../auth/user.model';
import { ErrorComponent } from '../shared/error/error.component';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '../shared/dialogs/email-dialog/email-dialog.component';
import { NgForm } from '@angular/forms';
import { ReauthenticationDialogComponent } from '../shared/dialogs/reauthentication-dialog/reauthentication-dialog.component';
import { timer } from 'rxjs';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [ErrorComponent, NgIf, NgIcon],
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
    this.reauthentication()
      .then(() => {
        let emailDialogRef = this.dialog.open(EmailDialogComponent);
        let newEmail;
        emailDialogRef.afterClosed().subscribe((res: NgForm) => {
          if (res.value.email) {
            newEmail = res.value.email;
            this.authService.verifyUserEmailToUpdate(newEmail).then(() => {
              this.successMessage =
                'Email changed! Check your email for the verification link.';
              timer(4000).subscribe(() => {
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

  changePassword() {}

  logout() {
    this.authService.signOut();
  }

  private reauthentication() {
    let reauthenticationDialogRef = this.dialog.open(
      ReauthenticationDialogComponent
    );
    return new Promise<void>((resolve, reject) => {
      reauthenticationDialogRef.afterClosed().subscribe((res: NgForm) => {
        if (res.value.password) {
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
