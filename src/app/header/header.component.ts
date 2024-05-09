import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated = false;
  isOpen = false;
  userProfilePicUrl: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User | null) => {
        this.isAuthenticated = !!user;
        if (!user) return;
        this.userProfilePicUrl = user.profilePhoto;
      }
    );
  }

  onLogout() {
    this.authService.signOut();
    this.isAuthenticated = false;
    this.closeMobileMenu();
  }

  closeMobileMenu() {
    this.isOpen = false;
  }

  openMobileMenu() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
