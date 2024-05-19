import { NgModule } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { NotesComponent } from './player/notes/notes.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
  ],
  imports: [InfiniteScrollModule, CommonModule, SharedModule],
  exports: [
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
  ],
})
export class PlaylistsModule {}
