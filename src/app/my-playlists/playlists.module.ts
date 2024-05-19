import { NgModule } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { NotesComponent } from './player/notes/notes.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ScrollTopComponent } from '../shared/scroll-top/scroll-top.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ErrorComponent } from '../shared/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackBtnComponent } from '../shared/back-btn/back-btn.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../shared/pipes/pipes.module';
import { IconsModule } from '../icons.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { DialogsModule } from '../shared/dialogs/dialogs.module';

@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
  ],
  imports: [
    InfiniteScrollModule,
    ErrorComponent,
    ReactiveFormsModule,
    BackBtnComponent,
    CommonModule,
    IconsModule,
    PipesModule,
    DirectivesModule,
    DialogsModule,
    ScrollTopComponent,
  ],
  exports: [
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
  ],
})
export class PlaylistsModule {}
