import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userSubject.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.signOut();
    this.isAuthenticated = false;
  }

  openMobileMenu() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {}
}
