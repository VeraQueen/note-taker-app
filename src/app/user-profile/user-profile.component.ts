import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../auth/user.model';
import { ErrorComponent } from '../shared/error/error.component';
import { NgIf } from '@angular/common';

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
  isLoading: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.userEmail = user.email;
      this.username = user.username;
    });
  }

  updateEmail() {
    this.isLoading = true;
    this.authService
      .updateUserEmail(this.userEmail)
      .then(() => {
        this.isLoading = false;
        this.successMessage = 'Email changed!';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        this.error = 'Please reauthenticate again to confirm this action.';
      });
  }
}
