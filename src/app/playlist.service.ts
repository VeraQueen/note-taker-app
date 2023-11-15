import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  // playlistAddedEmitter = new EventEmitter<Playlist[]>();
  private playlists: Playlist[] = [];

  constructor() {}

  getPlaylists() {
    return this.playlists.slice();
  }

  addPlaylist(newPlaylist: Playlist) {
    this.playlists.push(newPlaylist);
    // this.playlistAddedEmitter.emit(this.playlists.slice());
  }
}
