import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  playlistIdEmitter = new Subject<string>();
  private playlists: Playlist[] = [];

  getPlaylists() {
    return this.playlists.slice();
  }

  addPlaylist(playlist: Playlist) {
    this.playlists.push(playlist);
  }
}
