import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorComponent } from '../shared/error/error.component';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ErrorComponent, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // this.authService.getCurrentUser();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
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
          this.authService.getCurrentUser();
          this.isLoading = false;
          this.router.navigate(['/playlists']);
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    }
    authForm.reset();
  }
}
