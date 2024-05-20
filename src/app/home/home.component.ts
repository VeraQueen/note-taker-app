// Angular core libraries
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// Application-specific imports
import { AuthService } from '../services/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService
      .getCurrentUser()
      .then((user: User) => {
        this.user = user;
      })
      .catch(() => {});
  }

  onClick() {
    if (this.user) {
      this.router.navigate(['/playlists']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
