import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './icons.module';
import { DialogsModule } from './shared/dialogs/dialogs.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ErrorComponent } from './shared/error/error.component';
import { PlaylistsModule } from './my-playlists/playlists.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    PlaylistsModule,
    DialogsModule,
    IconsModule,
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ErrorComponent,
    FooterComponent,
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
