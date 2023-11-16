import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/playlists',
    pathMatch: 'full',
  },
  {
    path: 'playlists',
    component: MyPlaylistsComponent,
    children: [
      {
        path: 'playlist',
        component: PlaylistComponent,
      },
    ],
  },
  {
    path: 'search',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
