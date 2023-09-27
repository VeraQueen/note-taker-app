import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PlaylistsComponent, PlaylistComponent, NotesComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
