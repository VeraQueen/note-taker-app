import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { NotesComponent } from './my-playlists/notes/notes.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaylistsComponent,
    PlaylistComponent,
    NotesComponent,
    MyPlaylistsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
