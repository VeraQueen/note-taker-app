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
import { SuccessMessageComponent } from './shared/success-message/success-message.component';
import { AuthComponent } from './auth/auth.component';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AddedPlaylistDirective } from './shared/directives/added-playlist.directive';
import { RemoveWatchedVideoDirective } from './shared/directives/removeWatchedVideo.directive';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';

import { MatDialogModule } from '@angular/material/dialog';
import { DeletePlaylistDialogComponent } from './shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { UpdateEmailDialogComponent } from './shared/dialogs/update-email-dialog/update-email-dialog.component';
import { ReauthenticationDialogComponent } from './shared/dialogs/reauthentication-dialog/reauthentication-dialog.component';
import { UpdatePasswordDialogComponent } from './shared/dialogs/update-password-dialog/update-password-dialog.component';
import { ForgotPasswordDialogComponent } from './shared/dialogs/forgot-password-dialog/forgot-password-dialog.component';
import { UpdateUsernameDialogComponent } from './shared/dialogs/update-username/update-username.component';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ApostrophePipe } from './shared/pipes/apostophe.pipe';
import { AmpersandPipe } from './shared/pipes/ampersand.pipe';
import { IconsModule } from './icons.module';

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
    IconsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatDialogModule,
    AddedPlaylistDirective,
    RemoveWatchedVideoDirective,
    ApostrophePipe,
    AmpersandPipe,
    BackBtnComponent,
    ErrorComponent,
    SuccessMessageComponent,
    CssLoaderComponent,
    AuthComponent,
    DeletePlaylistDialogComponent,
    UpdateEmailDialogComponent,
    ReauthenticationDialogComponent,
    UpdatePasswordDialogComponent,
    ForgotPasswordDialogComponent,
    UpdateUsernameDialogComponent,
    FooterComponent,
    HomeComponent,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
