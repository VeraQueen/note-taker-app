import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'playlists',
    component: MyPlaylistsComponent,
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
