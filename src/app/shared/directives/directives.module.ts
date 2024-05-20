// Angular core libraries
import { NgModule } from '@angular/core';

// Application-specific imports
import { AddedPlaylistDirective } from './added-playlist.directive';
import { RemoveWatchedVideoDirective } from './removeWatchedVideo.directive';

@NgModule({
  imports: [AddedPlaylistDirective, RemoveWatchedVideoDirective],
  exports: [AddedPlaylistDirective, RemoveWatchedVideoDirective],
})
export class DirectivesModule {}
