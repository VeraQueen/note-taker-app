import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { NotesComponent } from './my-playlists/notes/notes.component';
import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/playlists',
    pathMatch: 'full',
  },
  {
    path: 'playlists',
    component: PlaylistsComponent,
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
  },
  {
    path: 'notes',
    component: NotesComponent,
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
