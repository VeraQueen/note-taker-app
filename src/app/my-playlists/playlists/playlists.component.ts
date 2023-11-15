import { Component, OnDestroy, OnInit } from '@angular/core';

import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[] = [];
  httpGetSub: Subscription;
  emitIdSub: Subscription;
  emitPlaylistsSub: Subscription;
  componentActive = true;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    // this.playlistService.playlistAddedEmitter.subscribe((playlists) => {
    //   this.playlists = playlists;
    // });
  }

  ngOnDestroy(): void {
    if (this.emitPlaylistsSub) this.emitPlaylistsSub.unsubscribe();
  }
}
