// Angular core libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Application components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Application modules
import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistsModule } from './my-playlists/playlists.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({ declarations: [AppComponent, HeaderComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FirebaseModule,
        PlaylistsModule,
        SharedModule,
        CoreModule,
        FooterComponent], providers: [provideAnimationsAsync('noop'), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
