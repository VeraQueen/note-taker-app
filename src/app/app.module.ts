import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './icons.module';
import { DialogsModule } from './shared/dialogs/dialogs.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { PlaylistsComponent } from './my-playlists/playlists/playlists.component';
import { PlaylistComponent } from './my-playlists/playlist/playlist.component';
import { PlayerComponent } from './my-playlists/player/player.component';
import { SearchComponent } from './search/search.component';
import { NotesComponent } from './my-playlists/player/notes/notes.component';

import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { CssLoaderComponent } from './shared/css-loader/css-loader.component';
import { ErrorComponent } from './shared/error/error.component';
import { SuccessMessageComponent } from './shared/success-message/success-message.component';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AddedPlaylistDirective } from './shared/directives/added-playlist.directive';
import { RemoveWatchedVideoDirective } from './shared/directives/removeWatchedVideo.directive';
import { ApostrophePipe } from './shared/pipes/apostophe.pipe';
import { AmpersandPipe } from './shared/pipes/ampersand.pipe';
import { FirebaseModule } from './firebase.module';

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
    DialogsModule,
    IconsModule,
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    AddedPlaylistDirective,
    RemoveWatchedVideoDirective,
    ApostrophePipe,
    AmpersandPipe,
    BackBtnComponent,
    ErrorComponent,
    SuccessMessageComponent,
    CssLoaderComponent,
    AuthComponent,
    FooterComponent,
    HomeComponent,
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
