import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  standalone: true,
  imports: [NgIcon, NgIf],
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.css',
})
export class BackBtnComponent {
  @Input() showButton: boolean = false;
  currentPage: string;

  constructor(private router: Router) {}

  onBack() {
    this.currentPage = this.router.url;
    if (this.currentPage === '/notes') {
      this.router.navigate(['/playlist']);
    } else {
      this.router.navigate(['/playlists']);
    }
  }
}
