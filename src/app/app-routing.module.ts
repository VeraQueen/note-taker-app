import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { PlayerComponent } from './my-playlists/player/player.component';
import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/playlists',
    pathMatch: 'full',
  },
  {
    path: 'playlists',
    component: PlaylistsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notes',
    component: PlayerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: '/playlists',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
