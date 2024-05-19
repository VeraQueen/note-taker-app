import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { DialogsModule } from './shared/dialogs/dialogs.module';
import { PlaylistsModule } from './my-playlists/playlists.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    PlaylistsModule,
    DialogsModule,
    FirebaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FooterComponent,
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
