import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreModule } from '../core.module';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordDialogComponent } from '../shared/dialogs/forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CoreModule, SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isSignInMode: boolean = true;
  isLoading = false;
  error: string;
  successMessage: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    const username = authForm.value.username;
    this.isLoading = true;
    if (this.isSignInMode) {
      this.authService
        .signIn(email, password)
        .then(() => {
          this.authService.getCurrentUser();
          this.isLoading = false;
          this.router.navigate(['/playlists']);
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    } else {
      this.authService
        .signUp(email, password)
        .then(() => {
          this.userService.setUsername(username).then(() => {
            this.authService.getCurrentUser();
            this.isLoading = false;
            this.router.navigate(['/playlists']);
          });
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    }
    authForm.reset();
  }

  onForgotPassword() {
    let forgotPasswordDialogRef = this.dialog.open(
      ForgotPasswordDialogComponent
    );
    let currentEmail: string;
    forgotPasswordDialogRef.afterClosed().subscribe((res: NgForm) => {
      if (res.value?.email) {
        currentEmail = res.value.email;
        this.userService
          .passwordReset(currentEmail)
          .then(() => {
            this.successMessage = 'Password reset email sent!';
            timer(4000).subscribe(() => {
              this.successMessage = null;
            });
          })
          .catch((error) => {
            this.error = error.message;
          });
      }
    });
  }
}
