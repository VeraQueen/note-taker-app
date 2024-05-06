import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isOpen = false;
  userProfilePicUrl: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userSubject.subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
      if (!user) return;
      this.userProfilePicUrl = user.profilePhoto;
    });
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

  ngOnDestroy() {}
}
