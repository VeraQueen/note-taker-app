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
import { CssLoaderComponent } from './shared/css-loader/css-loader.component';
import { ErrorComponent } from './shared/error/error.component';
import { AuthComponent } from './auth/auth.component';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';
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

import { AddedPlaylistDirective } from './shared/directives/added-playlist.directive';
import { RemoveWatchedVideoDirective } from './shared/directives/removeWatchedVideo.directive';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';

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
    MatDialogModule,
    AddedPlaylistDirective,
    RemoveWatchedVideoDirective,
    BackBtnComponent,
    ErrorComponent,
    CssLoaderComponent,
    AuthComponent,
    DialogComponent,
    FooterComponent,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
