import { NgModule } from '@angular/core';
import { AddedPlaylistDirective } from './added-playlist.directive';
import { RemoveWatchedVideoDirective } from './removeWatchedVideo.directive';

@NgModule({
  imports: [AddedPlaylistDirective, RemoveWatchedVideoDirective],
  exports: [AddedPlaylistDirective, RemoveWatchedVideoDirective],
})
export class DirectivesModule {}
