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
  heroXMark,
  heroCheck,
  heroArrowDown,
} from '@ng-icons/heroicons/outline';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CssLoaderComponent } from './shared/css-loader/css-loader.component';
import { AddedPlaylistDirective } from './shared/directives/added-playlist.directive';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ErrorComponent } from './shared/error/error.component';
import { RemoveWatchedVideoDirective } from './shared/directives/removeWatchedVideo.directive';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';
import { getAuth, provideAuth } from '@angular/fire/auth';

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
      heroXMark,
      heroCheck,
      heroArrowDown,
    }),
    InfiniteScrollModule,
    AddedPlaylistDirective,
    RemoveWatchedVideoDirective,
    BackBtnComponent,
    ErrorComponent,
    CssLoaderComponent,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'note-taker-app-400810',
        appId: '1:407343500901:web:ae91cfa94bdda4a392408c',
        storageBucket: 'note-taker-app-400810.appspot.com',
        apiKey: 'AIzaSyAIVAP0e87vEsCzRtxq2zh1HdbzUWpkNuk',
        authDomain: 'note-taker-app-400810.firebaseapp.com',
        messagingSenderId: '407343500901',
        measurementId: 'G-CGG06S1SC5',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
