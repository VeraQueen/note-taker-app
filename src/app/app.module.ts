import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './icons.module';
import { DialogsModule } from './shared/dialogs/dialogs.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { PlayerComponent } from './my-playlists/player/player.component';
import { SearchComponent } from './search/search.component';
import { NotesComponent } from './my-playlists/player/notes/notes.component';

import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { ErrorComponent } from './shared/error/error.component';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
  ],
  imports: [
    DirectivesModule,
    PipesModule,
    DialogsModule,
    IconsModule,
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    BackBtnComponent,
    ErrorComponent,
    FooterComponent,
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
