import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { NotesComponent } from './my-playlists/notes/notes.component';
import { SearchComponent } from './search/search.component';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroFolderOpen,
  heroPlay,
  heroPlus,
  heroArrowUp,
} from '@ng-icons/heroicons/outline';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CssLoaderComponent } from './shared/css-loader/css-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaylistsComponent,
    PlaylistComponent,
    NotesComponent,
    SearchComponent,
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
    }),
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
