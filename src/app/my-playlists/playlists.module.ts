// Angular core libraries
import { NgModule } from '@angular/core';

// Application-specific imports
import { SearchComponent } from '../search/search.component';
import { NotesComponent } from './player/notes/notes.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
  ],
  imports: [InfiniteScrollModule, CoreModule, SharedModule],
  exports: [
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
  ],
})
export class PlaylistsModule {}
