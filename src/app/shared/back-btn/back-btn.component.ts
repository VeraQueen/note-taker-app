import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { CoreModule } from 'src/app/core.module';

@Component({
  standalone: true,
  imports: [NgIcon, CoreModule],
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
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
