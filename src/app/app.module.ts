import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { PlayerComponent } from './my-playlists/player/player.component';
import { SearchComponent } from './search/search.component';
import { NotesComponent } from './my-playlists/player/notes/notes.component';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroFolderOpen,
  heroPlay,
  heroPlus,
  heroArrowUp,
  heroPencilSquare,
} from '@ng-icons/heroicons/outline';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CssLoaderComponent } from './shared/css-loader/css-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaylistsComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchComponent,
    NotesComponent,
    ScrollTopComponent,
    CssLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      heroPlus,
      heroFolderOpen,
      heroPlay,
      heroArrowLeft,
      heroArrowUp,
      heroPencilSquare,
    }),
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
